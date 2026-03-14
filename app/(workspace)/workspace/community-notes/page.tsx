"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { Check, Trash2, Star, Pin, Search } from "lucide-react";

export default function CommunityNotesPage() {

  const supabase = createClient();

  const [notes,setNotes]=useState<any[]>([])
  const [filter,setFilter]=useState("all")
  const [search,setSearch]=useState("")

  /* LOAD NOTES */

  async function loadNotes(){

    const {data,error}=await supabase
      .from("fan_wall_messages")
      .select("*")
      .order("created_at",{ascending:false})

    if(error) console.error(error)

    setNotes(data || [])

  }

  useEffect(()=>{
    loadNotes()
  },[])

  /* ACTIONS */

  async function approve(id:string){

    await supabase
      .from("fan_wall_messages")
      .update({status:"approved"})
      .eq("id",id)

    loadNotes()

  }

  async function remove(id:string){

    await supabase
      .from("fan_wall_messages")
      .delete()
      .eq("id",id)

    loadNotes()

  }

  async function togglePinned(note:any){

    await supabase
      .from("fan_wall_messages")
      .update({is_pinned:!note.is_pinned})
      .eq("id",note.id)

    loadNotes()

  }

  async function toggleFeatured(note:any){

    await supabase
      .from("fan_wall_messages")
      .update({is_featured:!note.is_featured})
      .eq("id",note.id)

    loadNotes()

  }

  /* FILTER */

  const filtered=notes
    .filter(note=>{

      if(filter==="pending") return note.status==="pending"
      if(filter==="approved") return note.status==="approved"
      if(filter==="pinned") return note.is_pinned===true
      if(filter==="featured") return note.is_featured===true

      return true

    })
    .filter(note=>
      note.name?.toLowerCase().includes(search.toLowerCase()) ||
      note.message?.toLowerCase().includes(search.toLowerCase())
    )

  /* COUNTS */

  const counts={
    all:notes.length,
    pending:notes.filter(n=>n.status==="pending").length,
    approved:notes.filter(n=>n.status==="approved").length,
    pinned:notes.filter(n=>n.is_pinned).length,
    featured:notes.filter(n=>n.is_featured).length
  }

  return(

    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-semibold">
          Community Notes
        </h1>

        <div className="text-sm text-gray-500">
          Total Notes: {notes.length}
        </div>

      </div>

      {/* SEARCH */}

      <div className="relative w-full max-w-md">

        <Search size={16} className="absolute left-3 top-3 text-gray-400"/>

        <input
          placeholder="Search notes..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-md text-sm"
        />

      </div>

      {/* FILTERS */}

      <div className="flex gap-2 flex-wrap">

        <FilterButton label={`All (${counts.all})`} active={filter==="all"} color="gray" onClick={()=>setFilter("all")} />

        <FilterButton label={`Pending (${counts.pending})`} active={filter==="pending"} color="yellow" onClick={()=>setFilter("pending")} />

        <FilterButton label={`Approved (${counts.approved})`} active={filter==="approved"} color="green" onClick={()=>setFilter("approved")} />

        <FilterButton label={`Pinned (${counts.pinned})`} active={filter==="pinned"} color="blue" onClick={()=>setFilter("pinned")} />

        <FilterButton label={`Featured (${counts.featured})`} active={filter==="featured"} color="purple" onClick={()=>setFilter("featured")} />

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto border rounded-lg">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b text-gray-600">

            <tr>

              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((note,i)=>(

              <tr key={note.id} className="border-b hover:bg-gray-50">

                <td className="p-3 text-gray-400">
                  {i+1}
                </td>

                <td className="p-3 font-medium flex items-center gap-2">

                  {note.name}

                  {note.is_pinned && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      Pinned
                    </span>
                  )}

                  {note.is_featured && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}

                </td>

                <td className="p-3 text-gray-500">
                  {note.city}, {note.country}
                </td>

                <td className="p-3 max-w-md text-gray-700">
                  {note.message}
                </td>

                <td className="p-3">
                  <StatusBadge status={note.status}/>
                </td>

                <td className="p-3 text-gray-400">
                  {new Date(note.created_at).toLocaleDateString()}
                </td>

                <td className="p-3">

                  <div className="flex justify-end gap-2">

                    {note.status==="pending" && (
                      <ActionButton icon={Check} color="green" onClick={()=>approve(note.id)} />
                    )}

                    <ActionButton
                      icon={Pin}
                      color={note.is_pinned ? "blueActive" : "blue"}
                      onClick={()=>togglePinned(note)}
                    />

                    <ActionButton
                      icon={Star}
                      color={note.is_featured ? "purpleActive" : "purple"}
                      onClick={()=>toggleFeatured(note)}
                    />

                    <ActionButton icon={Trash2} color="red" onClick={()=>remove(note.id)} />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

/* STATUS BADGE */

function StatusBadge({status}:{status:string}){

  const styles:any={

    pending:"bg-yellow-100 text-yellow-700",
    approved:"bg-green-100 text-green-700",
    rejected:"bg-red-100 text-red-700"

  }

  return(
    <span className={`px-2 py-1 text-xs rounded ${styles[status]}`}>
      {status}
    </span>
  )

}

/* FILTER BUTTON */

function FilterButton({label,active,color,onClick}:any){

  const colors:any={
    gray:"bg-gray-100 text-gray-700 border-gray-200",
    yellow:"bg-yellow-100 text-yellow-700 border-yellow-200",
    green:"bg-green-100 text-green-700 border-green-200",
    blue:"bg-blue-100 text-blue-700 border-blue-200",
    purple:"bg-purple-100 text-purple-700 border-purple-200"
  }

  return(
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-md border ${active?colors[color]:"bg-gray-50 text-gray-500 border-gray-200"}`}
    >
      {label}
    </button>
  )

}

/* ACTION BUTTON */

function ActionButton({icon:Icon,color,onClick}:any){

  const colors:any={
    green:"bg-green-500 hover:bg-green-600",
    red:"bg-red-500 hover:bg-red-600",
    blue:"bg-blue-500 hover:bg-blue-600",
    purple:"bg-purple-500 hover:bg-purple-600",
    blueActive:"bg-blue-700",
    purpleActive:"bg-purple-700"
  }

  return(
    <button
      title="Click to toggle"
      onClick={onClick}
      className={`p-2 rounded text-white ${colors[color]}`}
    >
      <Icon size={14}/>
    </button>
  )

}
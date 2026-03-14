import Card from "./Card";
import { Heart, Play, Users } from "lucide-react";

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* COMMUNITY NOTES */}

      <Card>
        <div className="relative">

          {/* ICON */}

          <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
            <Heart className="text-blue-500 fill-blue-500" size={16}/>
          </div>

          {/* TEXT */}

          <p className="text-gray-500 text-sm">
            Community Notes
          </p>

          <h2 className="text-3xl font-semibold mt-2 text-blue-500/80">
            214
          </h2>

          <p className="text-green-500 text-sm mt-1">
            +28 this week
          </p>

        </div>
      </Card>


      {/* ACTV SUBMISSIONS */}

      <Card>
        <div className="relative">

          <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
            <Play className="text-purple-500 fill-purple-500" size={16}/>
          </div>

          <p className="text-gray-500 text-sm">
            ACTV Submissions
          </p>

          <h2 className="text-3xl font-semibold mt-2 text-purple-500/80">
            59
          </h2>

          <p className="text-green-500 text-sm mt-1">
            +7 this week
          </p>

        </div>
      </Card>


      {/* USERS */}

      <Card>
        <div className="relative">

          <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
            <Users className="text-teal-500 fill-teal-500" size={16}/>
          </div>

          <p className="text-gray-500 text-sm">
            Users
          </p>

          <h2 className="text-3xl font-semibold mt-2 text-teal-500/80">
            4,321
          </h2>

          <p className="text-green-500 text-sm mt-1">
            +81 this week
          </p>

        </div>
      </Card>

    </div>
  );
}
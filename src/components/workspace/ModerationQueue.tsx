import Card from "./Card";
import Image from "next/image";

export default function ModerationQueue() {

  return (

    <Card>

      <div className="flex justify-between mb-6">

        <h3 className="font-semibold text-lg">
          Moderation Queue
        </h3>

        <button className="text-sm text-gray-500">
          View all →
        </button>

      </div>


      <div className="space-y-4">

        <div className="flex items-center justify-between bg-white rounded-xl p-3 border">

          <div className="flex items-center gap-3">

            <Image
              src="/avatar1.png"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />

            <div>

              <p className="font-medium">
                BananaDude
              </p>

              <p className="text-sm text-gray-500">
                When is the next ACTV episode?
              </p>

            </div>

          </div>

          <button className="bg-teal-500 text-white px-4 py-1 rounded-lg text-sm">
            Approve
          </button>

        </div>

      </div>

    </Card>

  );
}
import Card from "./Card";

export default function AnalyticsCard() {

  return (

    <Card>

      <div className="flex justify-between mb-4">

        <h3 className="font-semibold text-lg">
          Site Analytics
        </h3>

        <button className="text-sm text-gray-500">
          See details →
        </button>

      </div>

      <h2 className="text-3xl font-bold mb-4">
        45,287 <span className="text-gray-400 text-sm">Visits</span>
      </h2>

      <div className="h-32 flex items-center justify-center text-gray-400">
        chart coming soon
      </div>

    </Card>

  );
}
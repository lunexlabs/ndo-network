"use client";

import PageContainer from "@/src/components/workspace/PageContainer";
import Card from "@/src/components/workspace/Card";

export default function SubmissionsPage() {
  return (
    <PageContainer title="ACTV Submissions">

      <Card>

        <div className="flex justify-between mb-6">

          <h2 className="text-lg font-semibold">
            Recent Submissions
          </h2>

        </div>

        <p className="text-gray-500">
          ACTV island submissions will appear here.
        </p>

      </Card>

    </PageContainer>
  );
}
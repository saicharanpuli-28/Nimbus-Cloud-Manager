import MainLayout from "../layouts/MainLayout";
import { Trash2 } from "lucide-react";

function Trash() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[75vh]">

        <div className="bg-[#111827] border border-slate-700 rounded-3xl p-10 max-w-2xl w-full text-center">

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Trash2 size={40} className="text-yellow-400" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white">
            Trash
          </h1>

          <p className="text-slate-400 mt-4">
            This feature is currently under development.
          </p>

          <div className="mt-8 bg-[#0B1220] rounded-2xl p-6 border border-slate-700">

            <h2 className="text-lg font-semibold text-white mb-4">
              Planned Features
            </h2>

            <div className="space-y-3 text-slate-300">

              <p>✔ Restore deleted files</p>

              <p>✔ Permanently delete files</p>

              <p>✔ Automatic cleanup after retention period</p>

            </div>

          </div>

          <div className="mt-8">

            <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
              🚀 Coming Soon in Version 2.0
            </span>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Trash;
import MainLayout from "../layouts/MainLayout";
import { ChevronRight } from "lucide-react";

const tools = [
  {
    title: "PDF to Text",
    description: "Extract text from PDF documents.",
  },
  {
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one.",
  },
  {
    title: "Image Compressor",
    description: "Reduce image size while maintaining quality.",
  },
  {
    title: "Image to PDF",
    description: "Convert images into PDF documents.",
  },
  {
    title: "OCR Scanner",
    description: "Extract text from images.",
  },
  {
    title: "Document Encryption",
    description: "Password protect sensitive files.",
  },
];

function Tools() {
  return (
    <MainLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Future Tools
          </h1>

          <p className="text-slate-400 mt-2">
            Productivity tools planned for future releases of Nimbus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tools.map((tool) => (
            <div
              key={tool.title}
              className="bg-[#111827] border border-slate-700 rounded-2xl p-6 hover:border-blue-500 transition"
            >
              <div className="flex items-center justify-between">

                <h2 className="text-white font-semibold text-lg">
                  {tool.title}
                </h2>

                <ChevronRight
                  size={20}
                  className="text-blue-400"
                />

              </div>

              <p className="text-slate-400 text-sm mt-4">
                {tool.description}
              </p>

              <div className="mt-6 inline-block bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-xs">
                Coming Soon
              </div>

            </div>
          ))}

        </div>

      </div>
    </MainLayout>
  );
}

export default Tools;
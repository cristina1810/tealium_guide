import { ChevronDown, File, Search } from "lucide-react";
import DataLayer from "../components/DataLayer";
import ProductBrandEvent from "../components/ProductBrandEvent";
import MainButton from "../components/UI/MainButton";
import StepBox from "../components/UI/StepBox";
import StepCard from "../components/UI/StepCard";
import VideoButton from "../components/UI/VideoButton";
import SearchLowercase from "../components/SearchLowecase";
import DiscountBanner from "../components/DiscountBanner";
import Chatling from "../components/Chatling";
import SearchExistExtension from "../components/UI/SearchExistRule";
import SearchExistRule from "../components/UI/SearchExistRule";
import CopyButton from "../components/UI/CopyButton";
import InfoBox from "../components/UI/InfoBox";
import { useState } from "react";

export default function ChatlingIQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <div className="px-4 sm:px-6 lg:px-10 pb-24 animate-fadeIn">
      <div className="max-w-5xl mx-auto mb-10">
        {/* Título y botón en extremos opuestos */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 sm:mt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-tight">Chatling</h1>
          <VideoButton>Ver vídeo</VideoButton>
        </div>

        {/* Caja desplegable */}
        <div className="text-start bg-white/80 w-full p-4 rounded-xl bg-blur mt-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div
            className="flex items-center cursor-pointer select-none text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>Mostrar detalles del enunciado</p>
            <ChevronDown
              size={16}
              className={`ms-1.5 inline-block transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Contenido desplegable */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-screen mt-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {/* Descripción del caso */}
              <p>
                La página de{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
                >
                  ecommerce de Tealium
                </a>{" "}
                requiere habilitar un chatbot de{" "}
                <span className="font-medium text-gray-800">Chatling</span>, el
                cual no está disponible en el Marketplace. Este tag carga un
                chatbot potenciado por OpenAI, permitiendo a los clientes
                consultar sobre los productos directamente desde la página.
              </p>

              {/* Condiciones */}
              <div className="bg-amber-50/50 border border-amber-200/50 rounded-lg p-3">
                <p className="font-semibold text-amber-800 mb-2">
                  Condiciones de activación
                </p>
                <ul className="list-disc list-inside space-y-1 text-amber-700">
                  <li>Se haya realizado una búsqueda</li>
                  <li>Existan resultados disponibles</li>
                </ul>
                <p className="text-xs text-amber-600 mt-2">
                  Ambas condiciones deben cumplirse.
                </p>
              </div>

              {/* Snippet */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">Tag Snippet</p>
                <div className="border border-slate-200 rounded-lg p-3 flex items-center justify-between gap-3 group">
                  <code className="text-green-600 text-xs font-mono break-all leading-relaxed">
                    {`<script async data-id="2367823816" id="chatling-embed-script" type="text/javascript" src="https://chatling.ai/js/embed.js"></script>`}
                  </code>
                  <CopyButton
                    text={`<script async data-id="2367823816" id="chatling-embed-script" type="text/javascript" src="https://chatling.ai/js/embed.js"></script>`}
                    copied={copied}
                    setCopied={setCopied}
                  />
                </div>
              </div>

              {/* Documentación */}
              <p className="text-gray-500 text-xs inline-flex items-center gap-1">
                <File size={13} className="mr-1" /> Consulta la{" "}
                <a
                  href="https://docs.tealium.com/iq-tag-management/tags/tealium-generic-tag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
                >
                  documentación oficial de Tealium Generic Tag
                </a>{" "}
                para más detalles.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------- */}
      {/* Steps */}
      <div className="max-w-5xl mx-auto space-y-20 sm:space-y-24">
        {/* Extension 1 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-4">
              <StepBox number={1} />
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden bg-white/60 hover:bg-white/90 border border-slate-200/60 hover:border-slate-200 shadow-sm hover:shadow-md mb-3 transition-all duration-200">
                  {/* Header */}
                  <button
                    onClick={() => setIsOpen1(!isOpen1)}
                    className="w-full flex items-center justify-between px-5 py-4 sm:px-6 group"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors">
                        Load Rule: search and search exists
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-slate-500 transition-transform duration-300 ${
                        isOpen1 ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {/* Contenido colapsable */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen1 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 py-4 border-t border-gray-100 space-y-4">
                      {/* Descripción principal */}
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Regla de carga que permite activar el chatbot únicamente
                        en las condiciones elegidas (en este caso, que se haya
                        realizado una búsqueda y existan resultados).
                      </p>
                    </div>
                  </div>
                </div>
                <StepCard>
                  <SearchExistRule />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
        {/* Extension 2 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-10">
              <StepBox number={2} />
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden bg-white/60 hover:bg-white/90 border border-slate-200/60 hover:border-slate-200 shadow-sm hover:shadow-md mb-3 transition-all duration-200">
                  {/* Header */}
                  <button
                    onClick={() => setIsOpen2(!isOpen2)}
                    className="w-full flex items-center justify-between px-5 py-4 sm:px-6 group"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors">
                        Tag: Chatling
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-slate-500 transition-transform duration-300 ${
                        isOpen2 ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Contenido colapsable */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen2 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 py-4 border-t border-gray-100 space-y-4">
                      {/* Descripción principal */}
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Como Chatling no está disponible en el Marketplace de
                        Tealium, la extensión se configura usando un{" "}
                        <span className="font-semibold text-slate-800">
                          Tealium Generic Tag
                        </span>
                        . Los valores necesarios se extraen directamente del
                        snippet proporcionado por el vendor: el atributo{" "}
                        <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-xs font-mono">
                          src
                        </code>{" "}
                        corresponde al{" "}
                        <span className="font-medium text-slate-800">
                          Base URL
                        </span>
                        , y el resto de atributos se mapean según la
                        documentación como <strong>Custom Variable</strong>.
                      </p>

                      {/* Snippet con anotaciones */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Snippet:
                        </p>

                        {/* Bloque de código */}
                        <div className="bg-slate-100 rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                          <span className="text-slate-500">&lt;script </span>
                          <span className="text-slate-400">async </span>

                          {/* data-id highlight */}
                          <span className="bg-violet-500/10 text-violet-600 rounded px-0.5">
                            data-id=
                            <span className="text-violet-400 font-semibold">
                              "2367823816"
                            </span>
                          </span>
                          <span className="text-slate-500"> </span>

                          {/* id highlight */}
                          <span className="bg-blue-500/10 text-blue-600 rounded px-0.5">
                            id=
                            <span className="text-blue-400 font-semibold">
                              "chatling-embed-script"
                            </span>
                          </span>

                          <span className="text-slate-400">
                            {" "}
                            type="text/javascript"{" "}
                          </span>

                          {/* src / Base URL highlight */}
                          <span className="text-slate-500">src=</span>
                          <span className="text-slate-500">"</span>
                          <span className="bg-emerald-500/10 text-emerald-600 rounded px-0.5 font-semibold">
                            https://chatling.ai/js/embed.js
                          </span>
                          <span className="text-slate-500">"</span>

                          <span className="text-slate-500">
                            &gt;&lt;/script&gt;
                          </span>
                        </div>

                        {/* Leyenda */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-md p-2">
                            <span className="w-2 h-2 rounded-full bg-violet-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-violet-700">
                                attribute.data_id
                              </p>
                              <p className="text-xs text-violet-500 font-mono break-all">
                                2367823816
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-md p-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-blue-700">
                                attribute.id
                              </p>
                              <p className="text-xs text-blue-500 font-mono break-all">
                                chatling-embed-script
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-md p-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-emerald-700">
                                Base URL
                              </p>
                              <p className="text-xs text-emerald-500 font-mono break-all">
                                chatling.ai/js/embed.js
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <StepCard>
                  <Chatling />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

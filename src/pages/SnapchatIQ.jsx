import { ChevronDown, Search, Copy } from "lucide-react";
import DataLayer from "../components/DataLayer";
import ProductBrandEvent from "../components/ProductBrandEvent";
import MainButton from "../components/UI/MainButton";
import StepBox from "../components/UI/StepBox";
import StepCard from "../components/UI/StepCard";
import VideoButton from "../components/UI/VideoButton";
import SearchLowercase from "../components/SearchLowecase";
import DiscountBanner from "../components/DiscountBanner";
import AddToCartExtension from "../components/AddToCartExtension";
import AddToCart from "../components/AddToCart";
import SnapPixelApp from "../components/SnapPixel";
import { useState } from "react";
import CopyButton from "../components/UI/CopyButton";
import InfoBox from "../components/UI/InfoBox";
/* ════════════════════════════════════════════════════════════ */
export default function SnapchatIQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <div className="max-w-5xl mx-auto mb-8">
        {/* Título y botón en extremos opuestos */}
        <div className="flex items-center justify-between mt-8">
          <span className="text-4xl uppercase tracking-wide">Snapchat </span>
          <VideoButton>Ver vídeo</VideoButton>
        </div>

        {/* Caja desplegable */}
        <div className="text-start bg-white/80 w-full p-4 rounded-lg bg-blur mt-4">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>Mostrar detalles del enunciado</p>
            <ChevronDown
              size={16}
              className={`ms-1 inline-block transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Contenido desplegable */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>Configurar los siguientes eventos en el píxel de Snapchat:</p>

              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Page Views</li>
                <li>Searches</li>
                <li>Add to Cart</li>
              </ul>

              {/* Pixel ID */}
              <div className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Pixel ID
                  </span>
                  <p className="text-xs text-gray-700 font-mono mt-0.5">
                    3130cbed-9440-4af6-9184-9c6ca93b8a02
                  </p>
                </div>
                <CopyButton text="3130cbed-9440-4af6-9184-9c6ca93b8a02" />
              </div>

              <p>
                La acción de añadir un producto al carrito debe disparar un
                evento en <strong>Tealium iQ</strong> antes de configurar el tag
                de Snapchat.
              </p>

              <p>
                Se recomienda instalar la extensión{" "}
                <a
                  href="https://chromewebstore.google.com/detail/snap-pixel-helper/hnlbfcoodjpconffdbddfglilhkhpdnf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Snap Pixel Helper
                </a>{" "}
                para verificar que los eventos se estén enviando correctamente.
              </p>

              <p>
                Al configurar el evento <em>Add to Cart</em>, la cantidad se
                obtiene directamente desde el DOM mediante el siguiente
                selector:
              </p>

              {/* Código */}
              <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 bg-gray-50">
                  <span className="text-xs text-gray-400 font-medium">
                    JavaScript
                  </span>
                  <CopyButton text="document.querySelector('#qty').value" />
                </div>
                <pre className="px-3 py-2 text-xs text-gray-700 font-mono overflow-x-auto">
                  {`document.querySelector('#qty').value`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------- */}
      {/* Steps */}
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Extension 1 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-4">
              <StepBox number={1} />
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => setIsOpen1(!isOpen1)}
                    className="w-full flex items-center justify-between px-5 py-4 "
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-slate-800">
                        Extesión: Add to cart{" "}
                      </h3>
                    </div>
                  </button>
                </div>
                <StepCard>
                  <AddToCartExtension />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
        {/* Extension 2 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-4">
              <StepBox number={2} />
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => setIsOpen2(!isOpen2)}
                    className="w-full flex items-center justify-between px-5 py-4 "
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-semibold text-slate-800">
                        Evento: Add to Cart
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
                        Esta extensión se encarga de disparar el evento{" "}
                        <strong>Add to Cart</strong> cuando el usuario hace clic
                        en el botón de añadir al carrito. Para identificar dicho
                        botón se utiliza su clase CSS correspondiente, y se
                        mapean las variables necesarias que serán enviadas junto
                        al evento.
                      </p>
                    </div>
                  </div>
                </div>
                <StepCard>
                  <AddToCart />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
        {/* Extension 3 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-14">
              <StepBox number={3} />
              <div className="flex-1">
                <div>
                  <div className="flex items-center mb-3">
                    <h3 className=" text-2xl">Tag: Snap Pixel</h3>
                    <ChevronDown size={16} className="ms-1 cursor-pointer" />
                  </div>
                  {/* Texto que se oculta */}
                  <div className="mb-3">Explicación ejercicio</div>
                </div>
                <StepCard>
                  <SnapPixelApp />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

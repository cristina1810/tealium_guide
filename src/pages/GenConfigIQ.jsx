import { useState } from "react";
import { ChevronDown, Info, Search } from "lucide-react";

import DataLayer from "../components/DataLayer";
import ProductBrandEvent from "../components/ProductBrandEvent";
import MainButton from "../components/UI/MainButton";
import StepBox from "../components/UI/StepBox";
import StepCard from "../components/UI/StepCard";
import VideoButton from "../components/UI/VideoButton";
import SearchLowercase from "../components/SearchLowecase";
import DiscountBanner from "../components/DiscountBanner";
import InfoBox from "../components/UI/InfoBox";

export default function GenConfigIQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-10 pb-24 animate-fadeIn">
      {/* Header sticky */}
      <div className="max-w-5xl mx-auto mb-10">
        {/* Título y botón en extremos opuestos */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 sm:mt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-tight">
            Configuración general
          </h1>
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
              isOpen ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                Se pide revisar el{" "}
                <span className="font-medium text-gray-900">data layer</span>{" "}
                para las páginas del flujo. Se añadirán aquellas variables que
                se usen en{" "}
                <span className="font-medium text-gray-900">
                  eventos, tags, load rules
                </span>{" "}
                y{" "}
                <span className="font-medium text-gray-900">data mappings</span>
                .
              </p>

              <div>
                <p className="font-medium text-gray-900 mb-2">
                  Se pide revisar:
                </p>
                <ul className="grid grid-cols-2 gap-1.5">
                  {[
                    "Home",
                    "Categoría",
                    "Producto",
                    "Carrito",
                    "Checkout",
                    "Página de confirmación del pedido",
                  ].map((page) => (
                    <li
                      key={page}
                      className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5 "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {page}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="pt-1 border-t border-gray-100">
                Una vez revisado el data layer y añadidas las variables, se
                crearán{" "}
                <span className="font-medium text-gray-900">extensiones</span>.
                Más abajo encontramos la información con los detalles.
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
                      <h3 className="text-xl font-semibold text-slate-800">
                        Data Layer
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
                    <div className="px-5 py-4 border-t border-gray-100">
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Una vez revisadas las páginas que se nos piden,
                        detectamos la siguiente lista de variables:
                      </p>

                      {/* InfoBox */}
                      <InfoBox color="green">
                        <p className="text-green-800 text-sm leading-relaxed">
                          Se recomienda copiar CSV y, dentro de la herramienta -
                          Data Layer desplegamos la opción{" "}
                          <span className="font-semibold">
                            "+ Add Variable"
                          </span>{" "}
                          - Bulk Import from CSV y pegamos el CSV generado.
                        </p>
                      </InfoBox>
                    </div>
                  </div>
                </div>
                <StepCard>
                  <DataLayer />
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
                <div className="rounded-xl overflow-hidden bg-white/60 hover:bg-white/90 border border-slate-200/60 hover:border-slate-200 shadow-sm hover:shadow-md mb-3 transition-all duration-200">
                  {/* Header */}
                  <button
                    onClick={() => setIsOpen2(!isOpen2)}
                    className="w-full flex items-center justify-between px-5 py-4 sm:px-6 group"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-semibold text-slate-800">
                        Evento: product brand and event
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
                      isOpen2 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 py-4 border-t border-gray-100 space-y-4">
                      {/* Descripción principal */}
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Con una única extensión se actualizan automáticamente
                        los siguientes valores cada vez que el usuario accede a
                        una página de detalle de producto:
                      </p>

                      {/* Tabla de mapeos */}
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "product_brand", value: "teal_ecomm" },
                          { key: "tealium_event", value: "product_view" },
                        ].map(({ key, value }) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 font-mono text-xs text-blue-600 font-medium">
                              {key}
                            </span>
                            <span className="text-slate-300 text-sm">→</span>
                            <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 font-mono text-xs text-emerald-600 font-medium">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Nota técnica */}
                      <div className="flex gap-3 bg-white border border-slate-200 rounded-lg p-4">
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Se utiliza la opción{" "}
                          <span className="font-semibold text-slate-800">
                            Set Data Values
                          </span>{" "}
                          al configurar la extensión, con la condición de que
                          los valores se actualicen únicamente cuando el usuario
                          se encuentre en una{" "}
                          <span className="font-semibold text-slate-800">
                            página de detalle de producto
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <StepCard>
                  <ProductBrandEvent />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
        {/* Extension 3 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-4">
              <StepBox number={3} />
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden bg-white/60 hover:bg-white/90 border border-slate-200/60 hover:border-slate-200 shadow-sm hover:shadow-md mb-3 transition-all duration-200">
                  {/* Header */}
                  <button
                    onClick={() => setIsOpen3(!isOpen3)}
                    className="w-full flex items-center justify-between px-5 py-4 sm:px-6 group"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-slate-800">
                        Evento: search lowercase
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-slate-500 transition-transform duration-300 ${
                        isOpen3 ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Contenido colapsable */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen3 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 py-4 border-t border-gray-100">
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Con una única extensión se pide modificar a lower case
                        todas las búsquedas realizadas en la caja de busqueda de
                        la parte de arriba de la página.
                      </p>
                      <div className="flex gap-3 bg-white border border-slate-200 rounded-lg p-4">
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Se utiliza la opción{" "}
                          <span className="font-semibold text-slate-800">
                            Lower-Casing
                          </span>{" "}
                          al configurar la extensión, para que todas las
                          búsquedas se transformen a lower case.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <StepCard>
                  <SearchLowercase />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
        {/* Extension 4 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-10">
              <StepBox number={4} />
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden bg-white/60 hover:bg-white/90 border border-slate-200/60 hover:border-slate-200 shadow-sm hover:shadow-md mb-3 transition-all duration-200">
                  {/* Header */}
                  <button
                    onClick={() => setIsOpen4(!isOpen4)}
                    className="w-full flex items-center justify-between px-5 py-4 sm:px-6 group"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-slate-800">
                        Evento: discount banner
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-slate-500 transition-transform duration-300 ${
                        isOpen3 ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Contenido colapsable */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen4 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 py-4 border-t border-gray-100">
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Mostrar un banner de descuento en la pagina de detalle
                        de un producto cuando el precio de dicho producto sea
                        superior a 130.00. Usar el código mostrado en a
                        continuación.
                      </p>
                      <div className="flex gap-3 bg-white border border-slate-200 rounded-lg p-4">
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Se utiliza la opción{" "}
                          <span className="font-semibold text-slate-800">
                            Content Modification
                          </span>{" "}
                          al configurar la extensión, para inyectar el código
                          que nos mostrará el banner. Además lo condicionamos a
                          que aparezca únicamente en las páginas de detalle de
                          producto y cuando el precio sea superior a 130.00.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <StepCard>
                  <DiscountBanner />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

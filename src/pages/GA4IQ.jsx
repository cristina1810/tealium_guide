import { ChevronDown, Search } from "lucide-react";
import DataLayer from "../components/DataLayer";
import ProductBrandEvent from "../components/ProductBrandEvent";
import MainButton from "../components/UI/MainButton";
import StepBox from "../components/UI/StepBox";
import StepCard from "../components/UI/StepCard";
import VideoButton from "../components/UI/VideoButton";
import SearchLowercase from "../components/SearchLowecase";
import DiscountBanner from "../components/DiscountBanner";
import Chatling from "../components/Chatling";
import GA4ID from "../components/GA4ID";
import GA4Tag from "../components/GA4Tag";

export default function GA4IQ() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 pb-24 animate-fadeIn">
      {/* Header sticky */}
      <div className="max-w-5xl mx-auto mb-10 flex">
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 sm:mt-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-900 leading-tight">
              Google Analytics 4
            </h1>
            <VideoButton className="ms-auto">Ver vídeo</VideoButton>
          </div>
          {/* explicación
        - Hacer desplegable*/}
          <div className="text-start bg-white/80 w-full p-4 rounded-xl bg-blur mt-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              <p>Mostrar/ ocultar enunciado</p>
              <ChevronDown size={16} className="ms-1.5 inline-block" />
            </div>
            <div className="mt-2 text-sm text-slate-500">Parte que se puede desplegar con más información</div>
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
                <div>
                  <div className="flex items-center mb-3 group cursor-pointer">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors">Extensión: GA4 ID</h3>
                    <ChevronDown size={16} className="ms-1.5 text-slate-500 group-hover:text-slate-700 transition-colors" />
                  </div>
                  {/* Texto que se oculta */}
                  <div className="mb-3">Explicación ejercicio</div>
                </div>
                <StepCard>
                  <GA4ID />
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
                <div>
                  <div className="flex items-center mb-3 group cursor-pointer">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors">Tag: Google Analytics 4</h3>
                    <ChevronDown size={16} className="ms-1.5 text-slate-500 group-hover:text-slate-700 transition-colors" />
                  </div>
                  {/* Texto que se oculta */}
                  <div className="mb-3">Explicación ejercicio</div>
                </div>
                <StepCard>
                  <GA4Tag />
                </StepCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

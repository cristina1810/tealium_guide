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
import SearchExistExtension from "../components/UI/SearchExistRule";
import SearchExistRule from "../components/UI/SearchExistRule";

export default function ChatlingIQ() {
  return (
    <div>
      {/* Header sticky */}
      <div className="max-w-5xl mx-auto mb-8 flex ">
        <div>
          <div className="flex items-start mt-5 justify-end gap-4">
            <span className="text-3xl uppercase tracking-wide">Chatling</span>
            <VideoButton className="ms-auto">Ver vídeo</VideoButton>
          </div>
          {/* explicación
        - Hacer desplegable*/}
          <div className="text-start bg-white/80  w-full p-4 rounded-lg bg-blur mt-4">
            <div className="flex items-center cursor-pointer">
              <p>Mostrar/ ocultar enunciado</p>
              <ChevronDown size={16} className="ms-1 inline-block" />
            </div>
            <div>Parte que se puede desplegar con más información</div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------- */}
      {/* Steps */}
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Extension 1 */}
        <div className="flex-1">
          <div>
            <div className="flex items-start gap-6 mb-4">
              <StepBox number={1} />
              <div className="flex-1">
                <div>
                  <div className="flex items-center mb-3">
                    <h3 className=" text-2xl">
                      Load Rule: search and search exists
                    </h3>
                    <ChevronDown size={16} className="ms-1 cursor-pointer" />
                  </div>
                  {/* Texto que se oculta */}
                  <div className="mb-3">Explicación ejercicio</div>
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
                <div>
                  <div className="flex items-center mb-3">
                    <h3 className=" text-2xl">Tag: chatling</h3>
                    <ChevronDown size={16} className="ms-1 cursor-pointer" />
                  </div>
                  {/* Texto que se oculta */}
                  <div className="mb-3">Explicación ejercicio</div>
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

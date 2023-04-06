import { useRef, useState } from "react";
import {
  BackgroundStyle,
  ColorStyle,
  FontSizeStyle,
  LineWidthStyle,
  OpacityStyle,
  ReactDraw,
  ReactDrawContext,
  arrowTool,
  circleTool,
  diamondTool,
  duplicateTool,
  eraseTool,
  freeDrawTool,
  redoTool,
  selectTool,
  squareTool,
  straightLineTool,
  textAreaTool,
  trashTool,
  undoTool,
} from "@jzohdi/react-draw";

import peterPainIcon from "./images/icon-peter-paint.png";
import saveIcon from "./images/icon-save.png";
import undoIcon from "./images/icon-undo.png";
import redoIcon from "./images/icon-redo.png";
import pastIcon from "./images/icon-paste.png";
import cutIcon from "./images/icon-cut.png";
import copyIcon from "./images/icon-copy.png";
import selectIcon from "./images/icon-select.png";
import cropIcon from "./images/icon-crop.png";
import resizeIcon from "./images/icon-resize.png";
import rotateIcon from "./images/icon-rotate.png";

export const App = () => {
  const navOptions = ["Home", "Music", "Videos", "Socials", "Merch"] as const;
  const [tab, setTab] = useState<typeof navOptions[number]>("Home");
  const contextGetterRef = useRef<() => ReactDrawContext>();

  const handleSelectTool = (toolId: string) => {
    if (contextGetterRef.current) {
      console.log(`selectDrawingTool("${handleSelectTool}")`);
      const context = contextGetterRef.current();
      context.selectDrawingTool(toolId);
    }
  };

  return (
    <div>
      <div className="flex bg-black p-3 text-white h-16">
        <img src={peterPainIcon} alt="Peter Paint icon" />
        <div className="border-r border-gray-600 ml-3 mr-5" />
        <img className="mx-2 my-1" src={saveIcon} alt="Save icon" />
        <img className="mx-2" src={undoIcon} alt="Undo icon" />
        <img className="mx-2" src={redoIcon} alt="Redo icon" />
        <div className="border-r border-gray-600 ml-3 mr-5" />
        <h1 className="text-3xl font-bold">Peter McPoland - Digital Silence</h1>
      </div>

      <div className="flex bg-black text-white text-md">
        {navOptions.map((option) => (
          <button
            className={`px-6 py-2 transition-colors hover:bg-[#202020] ${
              tab === option ? "bg-[#303030]" : ""
            }`}
            onClick={() => setTab(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {tab === "Home" && (
        <>
          <div className="flex bg-[#303030] p-3 text-[#ababab] text-sm">
            <button className="flex flex-col items-center p-2 pb-0 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
              <img className="w-12 mb-1" src={pastIcon} alt="Paste icon" />
              <span>Paste</span>
            </button>
            <div>
              <button className="flex items-center w-full p-2 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                <img className="w-4 mr-4" src={cutIcon} alt="Paste icon" />
                <span>Cut</span>
              </button>
              <button className="flex items-center w-full p-2 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                <img className="w-6 mr-2" src={copyIcon} alt="Paste icon" />
                <span>Copy</span>
              </button>
            </div>

            <div className="border-r border-black mx-3" />

            <button
              className="flex flex-col justify-between items-center p-2 pb-0 rounded border border-transparent hover:bg-white/10 hover:border-white/10"
              onClick={() => handleSelectTool("react-draw-cursor")}
            >
              <img
                className="w-[70px] mb-1"
                src={selectIcon}
                alt="Select icon"
              />
              <span>Select</span>
            </button>
            <div>
              <button className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                <img className="w-4 mr-4" src={cropIcon} alt="Paste icon" />
                <span>Crop</span>
              </button>
              <button className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                <img className="w-4 mr-2" src={resizeIcon} alt="Paste icon" />
                <span>Resize</span>
              </button>
              <button className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                <img className="w-4 mr-2" src={rotateIcon} alt="Paste icon" />
                <span>Rotate</span>
              </button>
            </div>

            <div className="border-r border-black mx-3" />

            <div className="flex flex-col items-center">
              <div className="flex">
                <button
                  className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10"
                  onClick={() => handleSelectTool("react-draw-free-tool")}
                >
                  <img className="w-4 mr-2" src={cropIcon} alt="Paste icon" />
                  <span>Pencil</span>
                </button>
                <button className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                  <img className="w-4 mr-2" src={resizeIcon} alt="Paste icon" />
                  <span>Bucket</span>
                </button>
                <button
                  className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10"
                  onClick={() => handleSelectTool("react-draw-textarea-tool")}
                >
                  <img className="w-4 mr-2" src={rotateIcon} alt="Paste icon" />
                  <span>Text</span>
                </button>
              </div>
              <div className="flex">
                <button
                  className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10"
                  onClick={() => handleSelectTool("react-draw-erase-tool")}
                >
                  <img className="w-4 mr-2" src={cropIcon} alt="Paste icon" />
                  <span>Eraser</span>
                </button>
                <button className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                  <img className="w-4 mr-2" src={resizeIcon} alt="Paste icon" />
                  <span>Picker</span>
                </button>
                <button className="flex items-center w-full p-1 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
                  <img className="w-4 mr-2" src={rotateIcon} alt="Paste icon" />
                  <span>Zoom</span>
                </button>
              </div>
              <span>Tools</span>
            </div>

            <div className="border-r border-black mx-3" />

            <button className="flex flex-col justify-between items-center p-2 pb-0 rounded border border-transparent hover:bg-white/10 hover:border-white/10">
              <img
                className="w-[70px] mb-1"
                src={selectIcon}
                alt="Paste icon"
              />
              <span>Brush</span>
            </button>

            <div className="border-r border-black mx-3" />

            <div className="flex flex-col gap-1 justify-center">
              <div className="flex gap-1">
                <button className="w-8 h-8 bg-black" />
                <button className="w-8 h-8 bg-gray-500" />
                <button className="w-8 h-8 bg-white" />
                <button className="w-8 h-8 bg-red-600" />
                <button className="w-8 h-8 bg-orange-600" />
              </div>
              <div className="flex gap-1">
                <button className="w-8 h-8 bg-yellow-300" />
                <button className="w-8 h-8 bg-green-600" />
                <button className="w-8 h-8 bg-blue-600" />
                <button className="w-8 h-8 bg-purple-500" />
                <button className="w-8 h-8 bg-pink-500" />
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-[#444] p-5">
            <ReactDraw
              id="react-draw"
              topBarTools={[
                selectTool,
                freeDrawTool,
                squareTool,
                circleTool,
                diamondTool,
                straightLineTool,
                textAreaTool,
                arrowTool,
                eraseTool,
              ]}
              bottomBarTools={[undoTool, redoTool, trashTool, duplicateTool]}
              shouldSelectAfterCreate={false}
              styleComponents={{
                color: { order: 3, component: ColorStyle },
                background: { order: 4, component: BackgroundStyle },
                lineWidth: { order: 1, component: LineWidthStyle },
                opacity: { order: 0, component: OpacityStyle },
                fontSize: { order: 2, component: FontSizeStyle },
              }}
              layout={{ width: 1200, height: 300 }}
              contextGetter={(contextGetter) => {
                contextGetterRef.current = contextGetter;
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

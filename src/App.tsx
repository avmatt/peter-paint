import { useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
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
  freeDrawTool,
  redoTool,
  selectTool,
  squareTool,
  straightLineTool,
  textAreaTool,
  trashTool,
  undoTool,
  eraseTool,
} from "@jzohdi/react-draw";

import peterPainIcon from "./images/icon-peter-paint.png";
import saveIcon from "./images/icon-save.png";
import undoIcon from "./images/icon-undo.png";
import redoIcon from "./images/icon-redo.png";
import textIcon from "./images/icon-text.png";
import cutIcon from "./images/icon-cut.png";
import copyIcon from "./images/icon-copy.png";
import selectIcon from "./images/icon-select.png";
import lineIcon from "./images/icon-line.png";
import arrowIcon from "./images/icon-arrow.png";
import squareIcon from "./images/icon-square.png";
import circleIcon from "./images/icon-circle.png";
import diamondIcon from "./images/icon-diamond.png";
import brushIcon from "./images/icon-brush.png";
import piggy from "./images/piggy-website-pic-2.png";

export const App = () => {
  const navOptions = ["Home", "Music", "Videos", "Socials"] as const;
  const [tab, setTab] = useState<typeof navOptions[number] | null>("Home");
  const [tool, setTool] = useState<string | null>(null);
  const [color, setColor] = useState("#000");
  const [brushSize, setBrushSize] = useState("2");
  const contextGetterRef = useRef<() => ReactDrawContext>();

  const handleSelectTool = (toolId: string) => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      context.selectDrawingTool(toolId);
      setTool(toolId);
    }
  };

  const handleSave = () => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      const container = context.viewContainer;
      html2canvas(container).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = base64image;
        downloadLink.target = "_self";
        downloadLink.download = "peter-mcpoland.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
    }
  };

  const handleUndo = () => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      undoTool.handleContext(context);
    }
  };

  const handleRedo = () => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      redoTool.handleContext(context);
    }
  };

  const handleDelete = () => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      trashTool.handleContext(context);
    }
  };

  const handleDuplicate = () => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      duplicateTool.handleContext(context);
    }
  };

  const handleSelectColor = (color: string) => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      context.globalStyles.color = color;
      setColor(color);
    }
  };

  const handleSelectBrushSize = useCallback((size: string) => {
    if (contextGetterRef.current) {
      const context = contextGetterRef.current();
      context.globalStyles.lineWidth = size;
      setBrushSize(size);
      handleSelectTool("free-draw-tool");
    }
  }, []);

  useEffect(() => {
    if (contextGetterRef.current && tool === null) {
      handleSelectBrushSize("2");
    }
  }, [contextGetterRef, handleSelectBrushSize, tool]);

  return (
    <>
      <div className="fixed z-10 top-0 left-0 w-full flex bg-black p-2 text-white h-12 gap-1">
        <a className="block my-1" href="https://petermcpoland.com/">
          <img className="h-full" src={peterPainIcon} alt="Peter Paint icon" />
        </a>
        <div className="mx-2 my-1 border-r border-gray-600" />
        <button
          className="p-1 rounded border border-transparent hover:border-white/20 hover:bg-white/10"
          onClick={() => handleSave()}
        >
          <img className="h-full" src={saveIcon} alt="Save icon" />
        </button>
        <button
          className="p-1 rounded border border-transparent hover:border-white/20 hover:bg-white/10"
          onClick={() => handleUndo()}
        >
          <img className="h-full" src={undoIcon} alt="Undo icon" />
        </button>
        <button
          className="p-1 rounded border border-transparent hover:border-white/20 hover:bg-white/10"
          onClick={() => handleRedo()}
        >
          <img className="h-full" src={redoIcon} alt="Redo icon" />
        </button>
        <div className="mx-2 my-1 border-r border-gray-600" />
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            Peter McPoland - Digital Silence
          </h1>
        </div>
      </div>

      <div className="flex bg-black text-md border-b border-[#555] mt-14">
        {navOptions.map((option) => (
          <button
            key={option}
            className={`relative top-px px-6 py-1 bg-clip-border border border-transparent ${
              tab === option
                ? "text-white bg-[#303030] border-x border-x-[#555] border-t-[#555]"
                : "text-white/50 hover:text-white hover:bg-[#202020]  border-b-[#555]"
            }`}
            onClick={() => setTab(option)}
          >
            {option}
          </button>
        ))}
        <a
          href="https://shop.petermcpoland.com/"
          target="_blank"
          rel="noreferrer"
          className="relative top-px px-6 py-1 text-white/50 hover:text-white hover:bg-[#202020] border-b border-[#555]"
        >
          Merch
        </a>
        <div className="relative top-px w-full border-b border-[#555]" />
      </div>

      {tab === "Home" && (
        <div className="flex bg-[#303030] p-3 text-[#ababab] text-sm">
          <div className="flex gap-1">
            <button
              className={`flex flex-col justify-between items-center p-2 pb-0 rounded border border-transparent ${
                tool === "react-draw-cursor"
                  ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                  : "hover:bg-white/10 hover:border-white/10"
              }`}
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
              <button
                className="flex items-center w-full p-2 rounded border border-transparent hover:bg-white/10 hover:border-white/10"
                onClick={() => handleDelete()}
              >
                <img className="w-4 mr-4" src={cutIcon} alt="Cut icon" />
                <span>Cut</span>
              </button>
              <button
                className="flex items-center w-full p-2 rounded border border-transparent hover:bg-white/10 hover:border-white/10"
                onClick={() => handleDuplicate()}
              >
                <img className="w-6 mr-2" src={copyIcon} alt="Copy icon" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="border-r border-black mx-4" />

          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                <button
                  className={`p-1 rounded border border-transparent ${
                    tool === "react-draw-textarea-tool"
                      ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                      : "hover:bg-white/10 hover:border-white/10"
                  }`}
                  onClick={() => handleSelectTool("react-draw-textarea-tool")}
                >
                  <img className="w-4" src={textIcon} alt="Text icon" />
                </button>
                <button
                  className={`p-1 rounded border border-transparent ${
                    tool === "react-draw-line-tool"
                      ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                      : "hover:bg-white/10 hover:border-white/10"
                  }`}
                  onClick={() => handleSelectTool("react-draw-line-tool")}
                >
                  <img className="w-4" src={lineIcon} alt="Line icon" />
                </button>
                <button
                  className={`p-1 rounded border border-transparent ${
                    tool === "react-draw-arrow-tool"
                      ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                      : "hover:bg-white/10 hover:border-white/10"
                  }`}
                  onClick={() => handleSelectTool("react-draw-arrow-tool")}
                >
                  <img className="w-4" src={arrowIcon} alt="Arrow icon" />
                </button>
              </div>
              <div className="flex gap-1">
                <button
                  className={`p-1 rounded border border-transparent ${
                    tool === "react-draw-circle-tool"
                      ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                      : "hover:bg-white/10 hover:border-white/10"
                  }`}
                  onClick={() => handleSelectTool("react-draw-circle-tool")}
                >
                  <img className="w-4" src={circleIcon} alt="Circle icon" />
                </button>
                <button
                  className={`p-1 rounded border border-transparent ${
                    tool === "react-draw-square-tool"
                      ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                      : "hover:bg-white/10 hover:border-white/10"
                  }`}
                  onClick={() => handleSelectTool("react-draw-square-tool")}
                >
                  <img className="w-4" src={squareIcon} alt="Square icon" />
                </button>
                <button
                  className={`p-1 rounded border border-transparent ${
                    tool === "react-draw-diamond-tool"
                      ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                      : "hover:bg-white/10 hover:border-white/10"
                  }`}
                  onClick={() => handleSelectTool("react-draw-diamond-tool")}
                >
                  <img className="w-4" src={diamondIcon} alt="Diamond icon" />
                </button>
              </div>
              <span>Tools</span>
            </div>
          </div>

          <div className="border-r border-black mx-4" />

          <button
            className={`flex flex-col justify-between items-center p-1 rounded border border-transparent ${
              tool === "free-draw-tool"
                ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                : "hover:bg-white/10 hover:border-white/10"
            }`}
            onClick={() => handleSelectTool("free-draw-tool")}
          >
            <img className="w-12 m-1" src={brushIcon} alt="Brush icon" />
            <span>Brush</span>
          </button>

          <div className="flex flex-col gap-1 ml-1">
            <button
              className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                tool === "free-draw-tool" && brushSize === "2"
                  ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                  : "hover:bg-white/10 hover:border-white/10"
              }`}
              onClick={() => handleSelectBrushSize("2")}
            >
              <div className="w-[4px] h-[4px] rounded-full bg-black" />
            </button>
            <button
              className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                tool === "free-draw-tool" && brushSize === "4"
                  ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                  : "hover:bg-white/10 hover:border-white/10"
              }`}
              onClick={() => handleSelectBrushSize("4")}
            >
              <div className="w-[6px] h-[6px] rounded-full bg-black" />
            </button>
            <button
              className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                tool === "free-draw-tool" && brushSize === "6"
                  ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                  : "hover:bg-white/10 hover:border-white/10"
              }`}
              onClick={() => handleSelectBrushSize("6")}
            >
              <div className="w-[8px] h-[8px] rounded-full bg-black" />
            </button>
            <button
              className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                tool === "free-draw-tool" && brushSize === "8"
                  ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                  : "hover:bg-white/10 hover:border-white/10"
              }`}
              onClick={() => handleSelectBrushSize("8")}
            >
              <div className="w-[10px] h-[10px] rounded-full bg-black" />
            </button>
          </div>

          <div className="flex items-center ml-5">
            <div className="w-[53px] h-[53px]" style={{ background: color }} />
          </div>
          <div className="flex flex-col gap-1 ml-1 justify-center">
            <div className="flex gap-1">
              <button
                className="w-6 h-6 bg-[#000000]"
                onClick={() => handleSelectColor("#000000")}
              />
              <button
                className="w-6 h-6 bg-[#808080]"
                onClick={() => handleSelectColor("#808080")}
              />
              <button
                className="w-6 h-6 bg-[#ffffff]"
                onClick={() => handleSelectColor("#ffffff")}
              />
              <button
                className="w-6 h-6 bg-[#e21d1d]"
                onClick={() => handleSelectColor("#e21d1d")}
              />
              <button
                className="w-6 h-6 bg-[#fc8045]"
                onClick={() => handleSelectColor("#fc8045")}
              />
            </div>
            <div className="flex gap-1">
              <button
                className="w-6 h-6 bg-[#fced45]"
                onClick={() => handleSelectColor("#fced45")}
              />
              <button
                className="w-6 h-6 bg-[#24ca13]"
                onClick={() => handleSelectColor("#24ca13")}
              />
              <button
                className="w-6 h-6 bg-[#0088f0]"
                onClick={() => handleSelectColor("#0088f0")}
              />
              <button
                className="w-6 h-6 bg-[#9c1bff]"
                onClick={() => handleSelectColor("#9c1bff")}
              />
              <button
                className="w-6 h-6 bg-[#fc2ffa]"
                onClick={() => handleSelectColor("#fc2ffa")}
              />
            </div>
          </div>
        </div>
      )}

      {tab === "Music" && (
        <>
          <div className="flex justify-around bg-[#303030] p-3 text-white text-sm">
            <a
              className="hover:underline"
              href="https://music.amazon.com/artists/B07CVPTF8Q/peter-mcpoland"
              target="_blank"
              rel="noreferrer"
            >
              Amazon
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://music.apple.com/artist/peter-mcpoland/1379798503"
              target="_blank"
              rel="noreferrer"
            >
              Apple Music
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://music.apple.com/artist/peter-mcpoland/1379798503"
              target="_blank"
              rel="noreferrer"
            >
              iTunes
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://www.pandora.com/artist/peter-mcpoland/ARPxZbZKtJj2hbk"
              target="_blank"
              rel="noreferrer"
            >
              Pandora
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://soundcloud.com/user-10959040"
              target="_blank"
              rel="noreferrer"
            >
              Soundcloud
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://open.spotify.com/artist/23E65IfLBGQv0FBrMwCcG2"
              target="_blank"
              rel="noreferrer"
            >
              Spotify
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://www.youtube.com/channel/UC0KqD0SzttJQHyew9yK5qaQ"
              target="_blank"
              rel="noreferrer"
            >
              Youtube
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://music.youtube.com/channel/UCVn2zONmsnTIrSqA7l_qWyw"
              target="_blank"
              rel="noreferrer"
            >
              Youtube Music
            </a>
          </div>
        </>
      )}

      {tab === "Videos" && (
        <>
          <div className="bg-[#303030] text-white">
            <div className="max-w-4xl p-10 m-auto text-center">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/RsYOsgh3v1o"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="text-2xl font-bold mt-2">New At 9</div>
              <a
                href="https://www.youtube.com/watch?v=RsYOsgh3v1o"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-0.5 mt-1 text-md font-bold rounded-md border-2 border-[#5d8bb3] bg-[linear-gradient(180deg,rgba(115,138,188,1)_0%,rgba(181,209,225,1)_100%)] hover:bg-[linear-gradient(180deg,rgba(181,209,225,1)_0%,rgba(115,138,188,1)_100%)]"
              >
                Watch Now
              </a>
            </div>
          </div>
        </>
      )}

      {tab === "Socials" && (
        <>
          <div className="flex justify-around bg-[#303030] p-3 text-white text-sm">
            <a
              className="hover:underline"
              href="https://music.amazon.com/artists/B07CVPTF8Q/peter-mcpoland"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://music.apple.com/artist/peter-mcpoland/1379798503"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://music.apple.com/artist/peter-mcpoland/1379798503"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://www.pandora.com/artist/peter-mcpoland/ARPxZbZKtJj2hbk"
              target="_blank"
              rel="noreferrer"
            >
              Youtube
            </a>
            <div className="border-r border-black" />
            <a
              className="hover:underline"
              href="https://soundcloud.com/user-10959040"
              target="_blank"
              rel="noreferrer"
            >
              Tiktok
            </a>
          </div>
        </>
      )}

      {tab !== "Videos" && (
        <div className="flex justify-center p-5">
          <div className="max-w-4xl bg-white drop-shadow-[10px_10px_0px_rgba(0,0,0,0.3)]">
            <ReactDraw
              id="react-draw"
              topBarTools={[
                eraseTool,
                squareTool,
                freeDrawTool,
                circleTool,
                selectTool,
                diamondTool,
                straightLineTool,
                textAreaTool,
                arrowTool,
              ]}
              bottomBarTools={[undoTool, redoTool, trashTool, duplicateTool]}
              hideTopBar
              hideBottomBar
              shouldSelectAfterCreate={false}
              styleComponents={{
                color: { order: 3, component: ColorStyle },
                background: { order: 4, component: BackgroundStyle },
                lineWidth: { order: 1, component: LineWidthStyle },
                opacity: { order: 0, component: OpacityStyle },
                fontSize: { order: 2, component: FontSizeStyle },
              }}
              contextGetter={(contextGetter) => {
                contextGetterRef.current = contextGetter;
              }}
              layout="fit"
            >
              <img
                className="pointer-events-none selection:bg-transparent"
                alt="Piggy art"
                src={piggy}
              />
            </ReactDraw>
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 w-full text-center uppercase text-white text-xs p-2 bg-[#121212]">
        &copy; 2023 Sony Music Entertainment <br />
        <a
          href="http://www.sonymusic.com/privacy/termsandconditions.html"
          target="_blank"
          rel="noreferrer"
          className="sme-privacy-exclude"
        >
          Terms&nbsp;and&nbsp;Conditions
        </a>
        &nbsp;|&nbsp;
        <a
          href="http://www.sonymusic.com/privacypolicy.html"
          target="_blank"
          rel="noreferrer"
          className="sme-privacy-exclude"
        >
          Privacy&nbsp;Policy
        </a>
        &nbsp;|&nbsp;
        <a
          href="https://www.sonymusic.com/ccpa-contact-form/"
          target="_blank"
          rel="noreferrer"
          className="sme-privacy-exclude"
        >
          Do Not Sell My Personal Information
        </a>
        &nbsp;|&nbsp;
        <a
          href="https://www.sonymusic.com/privacy-policy/#your-california-privacy-rights"
          target="_blank"
          rel="noreferrer"
          className="sme-privacy-exclude"
        >
          Your California Privacy Rights
        </a>
        &nbsp;|&nbsp;
        <a
          href="https://www.sonymusic.com/feedback/"
          target="_blank"
          rel="noreferrer"
          className="sme-privacy-exclude"
        >
          Send&nbsp;Feedback
        </a>
      </footer>
    </>
  );
};

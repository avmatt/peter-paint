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
import piggy from "./images/piggy-website-bg.png";
import peterMcPolandLogo from "./images/logo-peter-mcpoland.png";
import piggyArtwork from "./images/piggy-artwork.png";

export const App = () => {
  const navOptions = [
    "Home",
    "Music",
    "Pre-Save",
    "Videos",
    "Socials",
    "Tour",
  ] as const;
  const [tab, setTab] = useState<(typeof navOptions)[number] | null>(() => {
    if (window.location.hash === "#tour") {
      return "Tour";
    }
    return "Home";
  });
  const [tool, setTool] = useState<string | null>(null);
  const [color, setColor] = useState("#000");
  const [brushSize, setBrushSize] = useState("2");
  const contextGetterRef = useRef<() => ReactDrawContext>();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [showShare, setShowShare] = useState(false);

  const handleResize = () => {
    if (canvasContainerRef.current) {
      canvasContainerRef.current.scrollLeft =
        (canvasContainerRef.current.scrollWidth -
          canvasContainerRef.current.clientWidth) /
        2;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

        setShowShare(true);
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.seated.com/app.js";
    document.body.appendChild(script);
  }, [tab]);

  return (
    <>
      <div className="fixed z-10 top-0 left-0 w-full sm:flex bg-black p-2 text-white gap-1 shrink-0">
        <div className="flex h-8 shrink-0">
          <a className="block" href="https://petermcpoland.com/">
            <img
              className="h-full"
              src={peterMcPolandLogo}
              alt="Peter McPoland"
            />
          </a>
          <div className="mx-2 my-1 border-r border-gray-600" />
          <a className="block my-1" href="https://petermcpoland.com/">
            <img
              className="h-full"
              src={peterPainIcon}
              alt="Peter Paint icon"
            />
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
        </div>
        <div className="hidden sm:block mx-2 my-1 border-r border-gray-600" />
        <div className="flex items-center w-full justify-center sm:justify-start text-center sm:text-left p-2 sm:py-0">
          <h1 className="text-2xl font-bold">
            Peter McPoland<span className="hidden xs:inline"> - </span>
            <br className="xs:hidden" />
            Blue
          </h1>
        </div>
      </div>

      <div className="flex flex-col bg-[#444] pb-20 xs:pb-16 md:pb-12 overflow-auto h-screen">
        <div className="bg-black text-md leading-[48px] pt-32 xs:pt-24 sm:pt-14 overflow-x-auto overflow-y-hidden shrink-0">
          <div className="flex min-w-[360px] border-b border-[#555]">
            {navOptions.map((option) => (
              <>
                {option === "Pre-Save" ? (
                  <a
                    href="https://petermcpoland.lnk.to/presave"
                    target="_blank"
                    rel="noreferrer"
                    className="relative top-px px-3 sm:px-6 py-1 whitespace-nowrap text-white/50 hover:text-white hover:bg-[#202020] border-b border-[#555]"
                  >
                    Pre-Save
                  </a>
                ) : (
                  <button
                    key={option}
                    className={`relative top-px px-3 sm:px-6 py-1 bg-clip-border border border-transparent ${
                      tab === option
                        ? "text-white bg-[#303030] border-x border-x-[#555] border-t-[#555]"
                        : "text-white/50 hover:text-white hover:bg-[#202020]  border-b-[#555]"
                    }`}
                    onClick={() => {
                      setTab(option);
                      window.location.hash = "";
                    }}
                  >
                    {option}
                  </button>
                )}
              </>
            ))}
            <a
              href="https://shop.petermcpoland.com/"
              target="_blank"
              rel="noreferrer"
              className="relative top-px px-3 sm:px-6 py-1 text-white/50 hover:text-white hover:bg-[#202020] border-b border-[#555]"
            >
              Merch
            </a>
            <div className="relative top-px w-full border-b border-[#555]" />
          </div>
        </div>

        {tab === "Home" && (
          <div className="bg-[#303030] text-[#ababab] text-sm overflow-x-auto shrink-0 h-[120px]">
            <div className="flex p-3 min-w-[600px]">
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

              <div className="block border-r border-black mx-4" />

              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <button
                      className={`p-1 rounded border border-transparent ${
                        tool === "react-draw-textarea-tool"
                          ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                          : "hover:bg-white/10 hover:border-white/10"
                      }`}
                      onClick={() =>
                        handleSelectTool("react-draw-textarea-tool")
                      }
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
                      onClick={() =>
                        handleSelectTool("react-draw-diamond-tool")
                      }
                    >
                      <img
                        className="w-4"
                        src={diamondIcon}
                        alt="Diamond icon"
                      />
                    </button>
                  </div>
                  <span>Tools</span>
                </div>

                <div className="block  h-full border-r border-black mx-4" />

                <button
                  className={`flex flex-col justify-between items-center p-1 rounded border border-transparent ${
                    tool === "free-draw-tool"
                      ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                      : "hover:bg-white/10 hover:border-white/10"
                  }`}
                  onClick={() => handleSelectTool("free-draw-tool")}
                >
                  <img
                    className="w-12 m-1"
                    style={{ background: color }}
                    src={brushIcon}
                    alt="Brush icon"
                  />
                  <span>Brush</span>
                </button>

                <div className="flex flex-col gap-0.5 ml-1">
                  <button
                    className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                      tool === "free-draw-tool" && brushSize === "2"
                        ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                        : "hover:bg-white/10 hover:border-white/10"
                    }`}
                    onClick={() => handleSelectBrushSize("2")}
                  >
                    <div
                      className="w-[4px] h-[4px] rounded-full"
                      style={{ background: color }}
                    />
                  </button>
                  <button
                    className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                      tool === "free-draw-tool" && brushSize === "4"
                        ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                        : "hover:bg-white/10 hover:border-white/10"
                    }`}
                    onClick={() => handleSelectBrushSize("4")}
                  >
                    <div
                      className="w-[6px] h-[6px] rounded-full"
                      style={{ background: color }}
                    />
                  </button>
                  <button
                    className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                      tool === "free-draw-tool" && brushSize === "6"
                        ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                        : "hover:bg-white/10 hover:border-white/10"
                    }`}
                    onClick={() => handleSelectBrushSize("6")}
                  >
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{ background: color }}
                    />
                  </button>
                  <button
                    className={`w-5 h-5 flex justify-center items-center p-1 rounded border border-transparent ${
                      tool === "free-draw-tool" && brushSize === "8"
                        ? "bg-blue-200/60 border-[#89a8d1] text-black/80"
                        : "hover:bg-white/10 hover:border-white/10"
                    }`}
                    onClick={() => handleSelectBrushSize("8")}
                  >
                    <div
                      className="w-[10px] h-[10px] rounded-full"
                      style={{ background: color }}
                    />
                  </button>
                </div>

                <div className="flex flex-col gap-1 justify-center ml-5">
                  <div className="flex gap-1">
                    <button
                      className={`w-6 h-6 bg-[#000000] border border-transparent ${
                        color === "#000000" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#000000")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#808080] border border-transparent ${
                        color === "#808080" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#808080")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#ffffff] border border-transparent ${
                        color === "#ffffff" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#ffffff")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#e21d1d] border border-transparent ${
                        color === "#e21d1d" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#e21d1d")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#fc8045] border border-transparent ${
                        color === "#fc8045" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#fc8045")}
                    />
                  </div>
                  <div className="flex gap-1">
                    <button
                      className={`w-6 h-6 bg-[#fced45] border border-transparent ${
                        color === "#fced45" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#fced45")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#24ca13] border border-transparent ${
                        color === "#24ca13" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#24ca13")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#0088f0] border border-transparent ${
                        color === "#0088f0" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#0088f0")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#9c1bff] border border-transparent ${
                        color === "#9c1bff" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#9c1bff")}
                    />
                    <button
                      className={`w-6 h-6 bg-[#fc2ffa] border border-transparent ${
                        color === "#fc2ffa" ? "border-white/50" : ""
                      }`}
                      onClick={() => handleSelectColor("#fc2ffa")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Music" && (
          <div className="shrink-0 h-[120px]">
            <div className="bg-[#303030] text-white text-sm overflow-x-auto shrink-0">
              <div className="flex justify-around p-3 min-w-[650px]">
                <a
                  className="hover:underline"
                  href="https://petermcpoland.lnk.to/DigitalSilence"
                  target="_blank"
                  rel="noreferrer"
                >
                  Digital Silence
                </a>
                <div className="border-r border-black" />
                <a
                  className="hover:underline"
                  href="https://petermcpoland.lnk.to/Blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blue
                </a>
              </div>
            </div>
          </div>
        )}

        {tab === "Videos" && (
          <div className="bg-[#303030] text-white shrink-0">
            <div className="max-w-4xl p-10 m-auto text-center">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/nOxH6KEh5n4"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <a
                href="https://www.youtube.com/watch?v=nOxH6KEh5n4"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-0.5 mt-3 mb-10 text-black text-md font-bold rounded-md border-2 border-[#5d8bb3] bg-[linear-gradient(180deg,#7fdcdd_0%,#9ffcfd_100%)] hover:bg-[linear-gradient(180deg,#9ffcfd_0%,#7fdcdd_100%)]"
              >
                Watch Now
              </a>

              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/2x8CMV-Jxg8"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <a
                href="https://www.youtube.com/watch?v=2x8CMV-Jxg8"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-0.5 mt-3 mb-10 text-black text-md font-bold rounded-md border-2 border-[#5d8bb3] bg-[linear-gradient(180deg,#7fdcdd_0%,#9ffcfd_100%)] hover:bg-[linear-gradient(180deg,#9ffcfd_0%,#7fdcdd_100%)]"
              >
                Watch Now
              </a>

              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/LYx-O64lJZk"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <a
                href="https://www.youtube.com/watch?v=LYx-O64lJZk"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-0.5 mt-3 mb-10 text-black text-md font-bold rounded-md border-2 border-[#5d8bb3] bg-[linear-gradient(180deg,#7fdcdd_0%,#9ffcfd_100%)] hover:bg-[linear-gradient(180deg,#9ffcfd_0%,#7fdcdd_100%)]"
              >
                Watch Now
              </a>
            </div>
          </div>
        )}

        {tab === "Socials" && (
          <div className="shrink-0 h-[120px]">
            <div className="flex justify-around bg-[#303030] p-3 text-white text-sm shrink-0">
              <a
                className="hover:underline"
                href="https://www.instagram.com/petermcpoland/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <div className="border-r border-black" />
              <a
                className="hover:underline"
                href="https://twitter.com/petermcpoland"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              <div className="border-r border-black" />
              <a
                className="hover:underline"
                href="https://www.facebook.com/petermcpolandmusic"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <div className="border-r border-black" />
              <a
                className="hover:underline"
                href="https://petermcpoland.lnk.to/DigitalSilence/YouTube"
                target="_blank"
                rel="noreferrer"
              >
                Youtube
              </a>
              <div className="border-r border-black" />
              <a
                className="hover:underline"
                href="https://www.tiktok.com/@petermcpoland?"
                target="_blank"
                rel="noreferrer"
              >
                Tiktok
              </a>
            </div>
          </div>
        )}

        {tab === "Tour" && (
          <div className="bg-[#303030] text-white shrink-0">
            <div className="max-w-4xl p-10 m-auto text-center">
              <div
                id="seated-55fdf2c0"
                data-artist-id="2ac128fb-3852-4b93-a92c-9cae1485a81e"
                data-css-version="3"
              ></div>
            </div>
          </div>
        )}

        <div
          ref={canvasContainerRef}
          className={`flex flex-col h-full p-5 overflow-y-hidden overflow-x-auto ${
            ["Videos", "Tour"].includes(tab ?? "") ? "invisible" : ""
          }`}
        >
          <div className="h-full aspect-[30/16] bg-white drop-shadow-[10px_10px_0px_rgba(0,0,0,0.3)] m-auto">
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
          <div className="w-full text-center pt-8" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-[#444] p-5 overflow-auto h-screen">
        <img src={piggyArtwork} className="w-[500px] max-w-full" />
      </div>

      {showShare && (
        <div className="fixed inset-0 bg-black/70 flex">
          <div className="relative w-80 m-auto pr-14 pb-36 border-white border-8 p-4 bg-[url(images/bg-share.png)] bg-no-repeat bg-top bg-cover">
            It looks like you are trying to share your drawing...
            <br />
            <br />
            Don't forget to include hashtag <strong>#digitalsilence</strong>
            <button
              className="absolute left-5 bottom-12 px-4 py-0.5 mt-1 text-md font-bold rounded-md border-2 border-[#5d8bb3] bg-[linear-gradient(180deg,#7fdcdd_0%,#9ffcfd_100%)] hover:bg-[linear-gradient(180deg,#9ffcfd_0%,#7fdcdd_100%)]"
              onClick={() => setShowShare(false)}
            >
              Ok, thanks!
            </button>
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 w-full text-center uppercase text-white text-[10px] p-2 bg-[#121212]">
        {["Home", "Tour"].includes(tab ?? "") && (
          <div className="block lg:hidden absolute w-full text-center p-3 text-lg bottom-full capitalize pointer-events-none">
            <div className="bg-[#333] border border-[#555] inline-block px-3">
              <span className="relative bottom-0.5">&larr; </span>
              Scroll
              <span className="relative bottom-0.5"> &rarr;</span>
            </div>
          </div>
        )}
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

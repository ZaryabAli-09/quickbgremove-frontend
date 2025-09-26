export function ImageProcessingBackdrop() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg backdrop-blur-xs flex items-center justify-center overflow-hidden">
      {/* Enhanced yellow particles */}
      <div className="absolute inset-0">
        {/* Top-left particles - Enhanced sizing */}
        <div className="absolute text-yellow-400 top-8 left-8 animate-bounce delay-75 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-300 top-14 left-14 animate-pulse delay-150 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-500 top-20 left-6 animate-bounce delay-300 text-lg">
          ⋆
        </div>

        {/* Top-right particles - Enhanced sizing */}
        <div className="absolute text-yellow-400 top-10 right-10 animate-pulse delay-200 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-300 top-16 right-16 animate-bounce delay-100 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-500 top-24 right-12 animate-pulse delay-250 text-lg">
          ⋆
        </div>

        {/* Left side particles - Enhanced sizing */}
        <div className="absolute text-yellow-400 top-1/3 left-6 animate-bounce delay-400 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-300 top-2/3 left-10 animate-pulse delay-500 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-500 top-1/2 left-4 animate-bounce delay-600 text-lg">
          ⋆
        </div>

        {/* Right side particles - Enhanced sizing */}
        <div className="absolute text-yellow-400 top-1/3 right-6 animate-pulse delay-350 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-300 top-2/3 right-10 animate-bounce delay-450 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-500 top-1/2 right-4 animate-pulse delay-550 text-lg">
          ⋆
        </div>

        {/* Bottom particles - Enhanced sizing */}
        <div className="absolute text-yellow-400 bottom-14 left-1/4 animate-bounce delay-700 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-300 bottom-16 left-1/2 animate-pulse delay-800 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-500 bottom-20 right-1/4 animate-bounce delay-900 text-lg">
          ⋆
        </div>
        <div className="absolute text-yellow-400 bottom-12 right-1/3 animate-pulse delay-1000 text-xl">
          ✦
        </div>

        {/* Center area particles - Enhanced sizing */}
        <div className="absolute text-yellow-300 top-2/5 left-2/5 animate-bounce delay-600 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-400 top-3/5 right-2/5 animate-pulse delay-700 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-500 top-1/2 left-2/5 animate-bounce delay-800 text-lg">
          ⋆
        </div>

        {/* Additional floating particles - Enhanced sizing */}
        <div className="absolute text-yellow-300 top-1/4 left-3/4 animate-ping delay-1000 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-400 top-3/4 left-1/4 animate-ping delay-1200 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-500 top-4/5 left-3/5 animate-ping delay-1400 text-lg">
          ⋆
        </div>

        {/* Extra stars for better coverage - Enhanced sizing */}
        <div className="absolute text-yellow-300 top-12 left-1/2 animate-bounce delay-200 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-400 top-3/4 right-1/4 animate-pulse delay-300 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-500 bottom-8 left-1/3 animate-bounce delay-400 text-lg">
          ⋆
        </div>
        <div className="absolute text-yellow-300 bottom-1/4 right-1/3 animate-ping delay-500 text-2xl">
          ☆
        </div>
        <div className="absolute text-yellow-400 top-1/2 right-1/3 animate-pulse delay-600 text-xl">
          ✦
        </div>
        <div className="absolute text-yellow-500 top-1/4 left-1/3 animate-bounce delay-700 text-lg">
          ⋆
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 text-center">
        <p className="text-yellow-200 text-lg  animate-pulse">
          <span className="text-blue-400 text-xl block mb-2">
            QuickBgRemove
          </span>
          is processing your image please wait ...
        </p>
      </div>
    </div>
  );
}

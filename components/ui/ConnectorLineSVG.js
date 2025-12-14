
const ConnectorLineSVG = ({ linePath }) => { // Only receive linePath as prop
  return (
    <svg className="position-absolute top-0 start-0 w-100 h-100" style={{pointerEvents: 'none', zIndex: 10, overflow: 'visible'}}>
      <defs>
         <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
           <stop offset="0%" stopColor="var(--bismart-gold-light)" stopOpacity="0.4" />
           <stop offset="50%" stopColor="var(--bismart-gold-light)" stopOpacity="1" />
           <stop offset="100%" stopColor="var(--bismart-gold-light)" stopOpacity="0.4" />
         </linearGradient>
      </defs>
      <path
        d={linePath}
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 4"
        className="animate-dashFlow transition-all duration-300 ease-out opacity-80"
      />
       <circle r="3" fill="var(--bismart-gold-light)">
         <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={linePath}
            keyPoints="0;1"
            keyTimes="0;1"
         />
       </circle>
    </svg>
  );
};

export default ConnectorLineSVG;
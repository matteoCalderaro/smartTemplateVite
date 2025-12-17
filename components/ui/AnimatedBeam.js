import React, { useId, useEffect, useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 20,
  duration = 50, // Default speed in pixels/second
  delay = 0,
  color = '#e0b86a',
  fromOffsetY = 0,
  toOffsetY = 0,
}) => {
  const [path, setPath] = useState('');
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef(null);
  const baseId = useId();
  const gradientId = `${baseId}-gradient`;

  // Calculate the path string
  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const startY = fromRect.top - containerRect.top + fromOffsetY; // Add offset to move origin down
      const endX = toRect.left + toRect.width / 2 - containerRect.left;
      const endY = toRect.top + toRect.height - containerRect.top + toOffsetY;

      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      
      const angle = Math.atan2(endY - startY, endX - startX);
      const perpAngle = angle + Math.PI / 2;

      const controlX = midX + Math.cos(perpAngle) * curvature;
      const controlY = midY + Math.sin(perpAngle) * curvature;

      setPath(`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
    };

    calculatePath();

    const resizeObserver = new ResizeObserver(calculatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);

    return () => resizeObserver.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);
  
  // Measure the path length once it's rendered
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  // Calculate dynamic duration based on path length and speed
  const animationDuration = useMemo(() => {
    if (pathLength === 0) return 3; // Use a default duration if pathLength is 0
    return pathLength / duration; // duration prop is now speed in px/sec
  }, [pathLength, duration]);
  
  const beamLength = 40;
  const totalDashArrayLength = 600;

  return (
    <svg
      fill="none"
      width="100%"
      height="100%"
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    >
      <defs>
          <linearGradient id={gradientId} gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor={color} offset="0%" stopOpacity="0" />
              <stop stopColor={color} offset="50%" stopOpacity="1" />
              <stop stopColor={color} offset="100%" stopOpacity="0" />
          </linearGradient>
      </defs>
      
      {/* The static track, now with a ref for measurement */}
      <motion.path
        ref={pathRef}
        d={path}
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      
      {/* The animating beam */}
      <motion.path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${beamLength} ${totalDashArrayLength}`}
        initial={{ strokeDashoffset: beamLength }}
        animate={{
            strokeDashoffset: -totalDashArrayLength,
        }}
        transition={{
            duration: animationDuration,
            delay: delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
        }}
      />
    </svg>
  );
};

export default AnimatedBeam;
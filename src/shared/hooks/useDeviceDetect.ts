import { useEffect, useState } from 'react';

export const useDeviceDetect = () => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        userAgent,
      ),
    );
    setMobile(mobile);
  }, []);

  return { isMobile };
};

import { Drawer } from 'antd';
import { memo, useMemo } from 'react';

import { useCustomTheme } from '@/entities/theme';
import { AddServices } from '@/features/services/add-services';
import { getDrawerStyles } from '@/shared/lib/get-drawer-styles';

type TServicesProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

export const Services = memo(({ isOpenSidebar, onCloseSidebar }: TServicesProps) => {
  const { theme } = useCustomTheme();

  const drawerStyles = useMemo(() => getDrawerStyles(theme), [theme]);
  return (
    <>
      <Drawer
        title="Услуги"
        placement="right"
        closable
        onClose={onCloseSidebar}
        open={isOpenSidebar}
        destroyOnHidden
        styles={drawerStyles}
      >
        <AddServices />
      </Drawer>
    </>
  );
});

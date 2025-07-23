import { Drawer } from 'antd';
import { memo, useMemo } from 'react';

import { useCustomTheme } from '@/entities/theme';
import { AddSubject } from '@/features/clients/add-subjects';
import { getDrawerStyles } from '@/shared/lib/get-drawer-styles';

type SubjectsProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

export const Subjects = memo(({ isOpenSidebar, onCloseSidebar }: SubjectsProps) => {
  const { theme } = useCustomTheme();

  const drawerStyles = useMemo(() => getDrawerStyles(theme), [theme]);
  return (
    <>
      <Drawer
        title="Предметы"
        placement="right"
        closable
        onClose={onCloseSidebar}
        open={isOpenSidebar}
        destroyOnHidden
        styles={drawerStyles}
      >
        <AddSubject />
      </Drawer>
    </>
  );
});

import dayjs from 'dayjs';

type TGetRecordTimeProps = {
  start_time: Date;
  end_time: Date;
};

export const getRecordTime = ({ start_time, end_time }: TGetRecordTimeProps) => {
  const start = start_time ? dayjs(start_time).format('HH:mm') : null;
  const end = end_time ? dayjs(end_time).format('HH:mm') : null;

  if (!start && !end) return null;
  if (!start) return end;
  if (!end) return start;

  return `${start} – ${end}`;
};

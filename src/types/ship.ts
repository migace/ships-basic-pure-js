export type CoordinateType = {
  row: number;
  column: number;
  isHit: boolean;
};

export type ShipType = {
  name: string;
  coordinates: CoordinateType[];
};

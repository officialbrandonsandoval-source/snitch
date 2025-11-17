export type Coordinates = {
  latitude: number;
  longitude: number;
};

const OFFSET = 0.0008;

export function fuseCoordinates({ latitude, longitude }: Coordinates): Coordinates {
  return {
    latitude: latitude + (Math.random() - 0.5) * OFFSET,
    longitude: longitude + (Math.random() - 0.5) * OFFSET
  };
}

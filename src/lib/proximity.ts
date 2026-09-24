export interface Point {
  x: number;
  y: number;
}

const MIN_EMPHASIS = 0.08;

export function getProximityWeights(pointer: Point, centers: Point[], influenceRadius: number) {
  if (influenceRadius <= 0) return centers.map(() => MIN_EMPHASIS);

  return centers.map((center) => {
    const distance = Math.hypot(pointer.x - center.x, pointer.y - center.y);
    return Math.max(MIN_EMPHASIS, 1 - distance / influenceRadius);
  });
}

export function getNearestIndex(pointer: Point, centers: Point[]) {
  if (!centers.length) return -1;

  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  centers.forEach((center, index) => {
    const distance = Math.hypot(pointer.x - center.x, pointer.y - center.y);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

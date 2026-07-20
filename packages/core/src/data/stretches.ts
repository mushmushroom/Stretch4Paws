export interface Stretch {
  id: number;
  name: string;
  description: string;
  duration: number; // in seconds
  startFrame: number;
  endFrame: number;
}

export const stretches: Stretch[] = [
  {
    id: 1,
    name: 'Rubber Neck',
    description:
      "Sit up tall and drop your right ear down towards your right shoulder (you don't need to touch it!) and hold for a few second and repeat for the left side.",
    duration: 18,
    startFrame: 72, // 3sec
    endFrame: 312, // 13sec
  },
  {
    id: 2,
    name: 'Reach for the Stars',
    description:
      'Interlace your fingers and reach towards the sky, as high as you can keeping your palms facing up towards the ceiling.',
    duration: 15,
    startFrame: 312, // 13sec
    endFrame: 672, // 28sec
  },
  {
    id: 3,
    name: 'Look Around',
    description:
      'Turn your head to the left and try and look over your shoulder and hold for a few seconds. Repeat on the right.',
    duration: 15,
    startFrame: 672, // 28sec
    endFrame: 852, //  35.5sec
  },
  {
    id: 4,
    name: 'Shrugs',
    description:
      'Raise both shoulders up towards your ears and hold for a few seconds and release. Repeat a few times for a good measure.',
    duration: 15,
    startFrame: 852, // 35.5sec
    endFrame: 948, // 39.5sec
  },
  {
    id: 5,
    name: 'Chest Opener',
    description: 'Bring your hands behind your back and hold.',
    duration: 14,
    startFrame: 948, // 39.5sec
    endFrame: 1296, // 54.5 sec
  },
  {
    id: 6,
    name: 'Reach and bend',
    description:
      'Extend your right arm over your head and reach out as far as you can to the left and gently bend. Hold for a few seconds and do it the other way.',
    duration: 25,
    startFrame: 1308, // 54.5 sec
    endFrame: 1608, // 67 sec
  },
];

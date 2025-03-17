export const SendCroppedImageVariables = (
  referenceCode: number,
  type: string,
  image?: string,
  action?: string,
) => {
  return {
    input: {
      referenceCode: referenceCode,
      type: type,
      image: image,
      action: action,
    },
  };
};

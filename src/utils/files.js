function getImages(files) {
  try {
    const images = [];
    for (const key in files) {
      images.push(files[key]);
    }
    return images;
  } catch (err) {
    return err;
  }
}

const getProjectPropreties = (images, properties, id) => {
  try {
    const imagesRefs = [];

    if (images) {
      for (const image of images) {
        imagesRefs.push(`images/${image.name}`);
      }
    }

    const projectPropreties = {
      projectId: id,
      ...properties, // { projectId: anfhbakfbakfn, buildingType: "residential" }
      imagesRefs, // ['images/dabdad.jpeg', 'images/test.png']
    };
    return projectPropreties;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getImages,
  getProjectPropreties,
};

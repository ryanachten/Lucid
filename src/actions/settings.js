export const setZoomOut = (zoomOut) => {
  return{
    type: 'SET_ZOOM_OUT',
    zoomOut
  }
};

export const setTileCount = (tileCount) => {
  return{
    type: 'SET_TILE_COUNT',
    tileCount
  }
};

export const setGeometryShape = (geometryShape) => {
  return{
    type: 'SET_GEOMETRY_SHAPE',
    geometryShape
  }
}

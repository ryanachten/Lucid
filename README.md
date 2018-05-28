# Lucid
## Mixed-Reality Psychedelia

![Header img](https://mir-s3-cdn-cf.behance.net/project_modules/1400/1f62fd66084939.5b0ba1beb3942.jpg)

## Lucid?
A mixed-reality application which allows users to design and experience psychedelic visualisations through their browser and virtual-reality headsets.

![Landing page](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1286b366084939.5b0b3d2063f62.jpg)

![Stack](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3c6bb666084939.5b0b3d2064968.png)

### Stack
This application leverages an array of excellent resources including Three.js for visualisations, React and Google’s Material Design language for user interface, Redux for state management, and Webpack for bundling.

![App outline](https://mir-s3-cdn-cf.behance.net/project_modules/1400/a4ec7966084939.5b0a80f93ab3b.png)

### Process
Lucid takes a low-resolution video feed from the user’s device.
This video is used for a material texture which is then applied to mesh geometry.

Mesh rotation is controlled by the user’s device orientation, allowing the user to view the interior of the geometry simply by moving their head.

The scene is then passed through a number of shaders before being rendered out stereoscopically for virtual-reality headsets.

![Shape settings](https://mir-s3-cdn-cf.behance.net/project_modules/1400/79a99066084939.5b0a80f93afe4.jpg)

## Shape Settings
The Shape settings panel is used to control the user’s view of the geometry as well as the shape of the geometry.

![Overview mode](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b7526d66084939.5b0a80f93a737.jpg)

### Overview / World View
By clicking the ‘Get Overview’ button, users can get an outside perspective of how the shape, texture and shaders are affecting the rendered output. This is handy when designing lucid experiences.

![Shape geometry](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/dafb0066084939.5b0a8564b4dc5.png)

### Shape Geometry
The ‘Shape Geometry’ drop-down allows users to control what 3D shape the video texture is rendered on, affecting the output of the visualisation dramatically.

![Texture settings](https://mir-s3-cdn-cf.behance.net/project_modules/1400/ea7d5766084939.5b0a80f93bc44.jpg)

## Texture Settings
Texture settings are used to control how the video texture is mapped onto the geometry.

![Tile count](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/56c4c766084939.5b0a8214b3c31.png)

### Tile Count
Tile count defines how many repetitions of the video texture are to be applied. The repetitions are applied seamlessly by being flipped horizontally and vertically at each row and column, making for interesting patterns.

![Rotate texture](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c8344b66084939.5b0a81eab1746.png)

### Rotate Texture
Rotate texture indicates whether or not an offset should be applied to the texture UV mapping. If so, the speed of this offset can be controlled using the X and Y sliders.

![Shader settings](https://mir-s3-cdn-cf.behance.net/project_modules/1400/d57e2166084939.5b0a8310b4178.jpg)

## Shader Settings
Lucid features a shader pipeline which allows users to activate and rearrange various filters before the scene is rendered.

![Shader types](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ecdf0166084939.5b0a8310b3a26.png)

### Shader types
The fragment shaders included in the application either further distort the visual output (such as those featured above), or act as utilities for adjusting the colour, brightness or contrast of the image.

![Shader order](https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c34e9c66084939.5b0a8310b3371.png)

### Shader Order
The order in which shaders are arranged is super important when designing visualisations. Accordingly, Lucid allows users to drag-and-drop shaders to taste.

![Shader visuals](https://mir-s3-cdn-cf.behance.net/project_modules/1400/1ed0fc66084939.5b0b4ec67be87.jpg)

Designed and developed by Ryan Achten (2018)

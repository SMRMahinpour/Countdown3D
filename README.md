# Countdown3D

<p align="center">
  <em>Transform Time into Stunning 3D Experiences</em>
</p>

<div align="center">
  <img alt="last-commit" src="https://img.shields.io/github/last-commit/SMRMahinpour/Countdown3D?style=flat&logo=git&color=0080ff">
  <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/SMRMahinpour/Countdown3D?style=flat&color=0080ff">
  <img alt="npm version" src="https://img.shields.io/npm/v/countdown3d?style=flat&color=0080ff">
  <img alt="license" src="https://img.shields.io/npm/l/countdown3d?style=flat&color=0080ff">
</div>

---

## Overview

**Countdown3D** is a React library for creating **3D cube-based countdown timers** with smooth rotation, drag interactions, and customizable cube animations. It’s built with **TypeScript**, **React**, and **Vite**, offering modular, reusable components.

**Key Features:**

- 🎨 3D cube digits with realistic rotation  
- 🖱️ Draggable countdown with momentum effect  
- ⚙️ Customizable start angle, cube size, spacing, and max drag  
- 🚀 Lightweight and easy to integrate in React apps  

---

## Installation

Install via npm:

```bash
npm install countdown3d
```

or with yarn:

```bash
yarn add countdown3d
```

---

## Usage

### Basic Example

```tsx
import React, { useState } from "react";
import { Countdown, DraggableWrapper } from "countdown3d";

function App() {
  const [translateX, setTranslateX] = useState(0);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <DraggableWrapper onTranslateX={setTranslateX} maxDrag={200}>
        <Countdown
          startSeconds={3600}
          translateX={translateX}
          startAngle={-10}
          cubeSize={20}
          spacing={3}
        />
      </DraggableWrapper>
    </div>
  );
}

export default App;
```

### Props

#### `Countdown`

| Prop            | Type               | Default | Description |
|-----------------|------------------|---------|------------|
| `startSeconds`  | `number`          | 3600    | Total countdown seconds |
| `translateX`    | `number`          | 0       | Current horizontal drag value |
| `startAngle`    | `number`          | 0       | Initial rotation angle of cubes |
| `cubeSize`      | `number`          | 20      | Size of each cube in pixels |
| `spacing`       | `number`          | 2       | Space between cubes |
| `digitSpacing`  | `number`          | `cubeSize*3+10` | Space between digits |
| `maxTranslate`  | `number`          | 300     | Max horizontal translation for rotation |

#### `DraggableWrapper`

| Prop           | Type               | Default | Description |
|----------------|------------------|---------|------------|
| `children`     | `ReactNode`       | -       | Content to drag |
| `onTranslateX` | `(x:number)=>void` | -     | Callback for current drag value |
| `maxDrag`      | `number`          | undefined | Maximum horizontal drag |

---

## Demo

You can see a live demo here: soon!

---

## Contributing

1. Fork the repository  
2. Clone your fork  
3. Install dependencies with `npm install`  
4. Make your changes  
5. Submit a pull request  

---

## License

**MIT License** © [SMR.Mahinpour](https://github.com/SMRMahinpour)


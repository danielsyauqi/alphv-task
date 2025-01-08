import React from 'react';
import { usePage,Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Triangle, Circle, Square } from '@/Components/Shapes';
import ShapeGallery from '@/components/ShapeGallery';


const Gallery = () => {
  const { shapes } = usePage().props;

  const renderShape = (shape) => {
     switch (shape.shape) {
      case 'triangle':
          return <Triangle color={shape.color} />;
      case 'square':
          return <Square color={shape.color} />;
      default:
          return <Circle color={shape.color} />;
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Shape Gallery</title>
    </Head>
      <Navbar />
      <div className="py-12">
        <ShapeGallery shapes={shapes} renderShape={renderShape} />
      </div>
    </div>
  );
};

export default Gallery;
<?php

namespace App\Http\Controllers;

use App\Models\Shape;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ShapeController extends Controller

{
    
    public function index()
    {
        return Inertia::render('Shapes/Index', [
            'shapes' => Shape::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Shapes/Create');
    }

    

    public function gallery()
    {
        $shapes = Shape::all();
        return Inertia::render('Gallery', ['shapes' => $shapes]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'shape' => ['required', 'string', 'in:circle,square,triangle'],
            'color' => ['required', 'string', 'regex:/^#([A-Fa-f0-9]{6})$/'],
        ])->validate();

        Shape::create($request->all());

        return redirect()->route('shapes.index')
            ->with('message', 'Shape created successfully');
    }

    public function edit(Shape $shape)
    {
        return Inertia::render('Shapes/Edit', [
            'shape' => $shape
        ]);
    }

    public function update(Request $request, Shape $shape)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'shape' => ['required', 'string', 'in:circle,square,triangle'],
            'color' => ['required', 'string', 'regex:/^#([A-Fa-f0-9]{6})$/'],
        ])->validate();

        $shape->update($request->all());

        return redirect()->route('shapes.index')
            ->with('message', 'Shape updated successfully');
    }

    public function destroy(Shape $shape)
    {
        $shape->delete();

        return redirect()->route('shapes.index')
            ->with('message', 'Shape deleted successfully');
    }
}
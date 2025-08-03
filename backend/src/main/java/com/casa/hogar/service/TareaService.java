package com.casa.hogar.service;

import java.util.List;
import java.util.Optional;

import com.casa.hogar.model.Tarea;

public interface TareaService {

    public List<Tarea> findAll();

    public Optional<Tarea> findById(Integer id);

    public Tarea addTarea(Tarea tarea);

    public void remove(Integer id);

    public Tarea updateTarea(Integer id, Tarea tarea);
}

package com.casa.hogar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.casa.hogar.model.Tarea;
import com.casa.hogar.repository.TareaRepository;

@Service
public class TareaServiceImpl implements TareaService{
    
    @Autowired
	private TareaRepository tareaRepository;

	@Override
	public List<Tarea> findAll() {
		return tareaRepository.findAll();
	}

	@Override
	public Optional<Tarea> findById(Integer id) {
		return tareaRepository.findById(id);
	}

	@Override
	public Tarea addTarea(Tarea tarea) {
		return tareaRepository.save(tarea);
	}

	@Override
	public void remove(Integer id) {
		tareaRepository.deleteById(id);

	}

	@Override
	public Tarea updateTarea(Integer id, Tarea tarea) {
		tarea.setId(id);
		return tareaRepository.save(tarea);
	}

}

package com.casa.hogar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casa.hogar.model.Tarea;
import com.casa.hogar.service.TareaService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tarea")
public class TareaController {

	@Autowired
	private TareaService tareaService;

	@GetMapping("/findAll")
	public List<Tarea> findAll() {
		return tareaService.findAll();
	}

	@GetMapping("/{id}")
	public Optional<Tarea> findById(@PathVariable Integer id) {
		return tareaService.findById(id);
	}

	@PostMapping("/add")
	public ResponseEntity<Tarea> addTarea(@RequestBody Tarea tarea) {
		Tarea nuevoTarea = tareaService.addTarea(tarea);
		return ResponseEntity.ok(nuevoTarea);
	}

	@DeleteMapping("/{id}")
	public void remove(@PathVariable Integer id) {
		tareaService.remove(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateTarea(@PathVariable Integer id, @RequestBody Tarea tareaDetails) {
		Tarea tareaActualizado;
		tareaActualizado = tareaService.updateTarea(id, tareaDetails);
		return ResponseEntity.ok(tareaActualizado);
	}

}
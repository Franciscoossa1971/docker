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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casa.hogar.model.Persona;
import com.casa.hogar.service.PersonaService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/personas")
public class PersonaController {

	@Autowired
	private PersonaService personaService;

	@GetMapping("/findAll")
	public List<Persona> findAll() {
		return personaService.findAll();
	}

	@GetMapping("/{id}")
	public Optional<Persona> findById(@RequestParam Integer id) {
		return personaService.findById(id);
	}

	@PostMapping("/add")
	public ResponseEntity<Persona> addPersona(@RequestBody Persona persona) {
		Persona nuevoPersona = personaService.addPersona(persona);
		return ResponseEntity.ok(nuevoPersona);
	}

	@DeleteMapping("/{id}")
	public void remove(@PathVariable Integer id) {
			personaService.remove(id);
	
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updatePersona(@PathVariable Integer id, @RequestBody Persona personaDetails) {
		Persona personaActualizado;
			personaActualizado = personaService.updatePersona(id, personaDetails);
			return ResponseEntity.ok(personaActualizado);
		
	}

}
package com.casa.hogar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.casa.hogar.model.Persona;
import com.casa.hogar.repository.PersonaRepository;

@Service
public class PersonaServiceImpl implements PersonaService {

	@Autowired
	private PersonaRepository personaRepository;

	@Override
	public List<Persona> findAll() {
		return personaRepository.findAll();
	}

	@Override
	public Optional<Persona> findById(Integer id) {
		return personaRepository.findById(id);
	}

	@Override
	public Persona addPersona(Persona persona) {
		return personaRepository.save(persona);
	}

	@Override
	public void remove(Integer id) {
		personaRepository.deleteById(id);

	}

	@Override
	public Persona updatePersona(Integer id, Persona persona) {
		persona.setId(id);
		return personaRepository.save(persona);
	}

}

package com.casa.hogar.service;

import java.util.List;
import java.util.Optional;

import com.casa.hogar.model.Persona;

public interface PersonaService {
	
	public List<Persona> findAll();
	public Optional<Persona> findById(Integer id);
	public Persona addPersona(Persona persona);
	public void remove(Integer id);
	public Persona updatePersona(Integer id,Persona persona);
}

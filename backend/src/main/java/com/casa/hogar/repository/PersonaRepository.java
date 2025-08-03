package com.casa.hogar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.casa.hogar.model.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Integer> {
}

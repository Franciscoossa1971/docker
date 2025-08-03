package com.casa.hogar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.casa.hogar.model.Tarea;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Integer> {
}

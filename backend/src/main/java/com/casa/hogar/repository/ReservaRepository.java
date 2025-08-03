package com.casa.hogar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.casa.hogar.model.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
        @Query("SELECT r.hora FROM Reserva r WHERE r.dia = :dia")
        List<String> findHorasReservadasPorDia(@Param("dia") String dia);

}

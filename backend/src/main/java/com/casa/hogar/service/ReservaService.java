package com.casa.hogar.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.casa.hogar.model.Reserva;
import com.casa.hogar.repository.ReservaRepository;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    // Lista de todas las horas posibles del día
    private static final List<String> TODAS_LAS_HORAS = Arrays.asList(
            "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
            "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
            "21:00", "21:30", "22:00", "22:30", "23:00", "23:30");

    public List<String> getHorasDisponibles(Reserva reserva) {
        // Obtiene las horas reservadas para un día específico
        List<String> horasReservadasRaw = reservaRepository.findHorasReservadasPorDia(reserva.getDia());

        List<String> horasReservadas = horasReservadasRaw.stream()
                .map(hora -> {
                    if (hora != null && hora.length() >= 5) {
                        return hora.substring(0, 5);
                    }
                    return "";
                })
                .filter(h -> !h.isEmpty())// Filtra entradas vacías
                .collect(Collectors.toList());// Convierte el stream a lista

        return TODAS_LAS_HORAS.stream()
                .filter(hora -> !horasReservadas.contains(hora))// Filtra las horas que ya están reservadas
                .collect(Collectors.toList());// Devuelve solo las horas disponibles
    }

    public boolean isFechaDisponible(Reserva reserva) {
        List<String> horasReservadas = reservaRepository.findHorasReservadasPorDia(reserva.getDia());
        // Verifica si la hora solicitada está disponible
        return !horasReservadas.contains(reserva.getHora());
    }

    public List<Reserva> obtenerReservas() {
        return reservaRepository.findAll();
    }

    public Reserva guardarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public void removeReserva(Integer id) {
        reservaRepository.deleteById(id);
    }
}

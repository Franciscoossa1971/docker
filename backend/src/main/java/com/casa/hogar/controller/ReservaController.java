package com.casa.hogar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casa.hogar.model.Reserva;
import com.casa.hogar.service.ReservaService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // Obtener todas las reservas
    @GetMapping("/findAll")
    public List<Reserva> obtenerReservas() {
        return reservaService.obtenerReservas();
    }

    // Añadir una nueva reserva
    @PostMapping("/add")
    public ResponseEntity<Reserva> guardarReserva(@RequestBody Reserva reserva) {
        Reserva nuevaReserva = reservaService.guardarReserva(reserva);
        return ResponseEntity.ok(nuevaReserva);
    }

    // Verificar si una fecha y hora están disponibles
    @PostMapping("/fecha-disponible")
    public ResponseEntity<Map<String, Boolean>> fechaDisponible(@RequestBody Reserva reserva) {
        boolean disponible = reservaService.isFechaDisponible(reserva);// Verifica si la hora está disponible
        Map<String, Boolean> response = new HashMap<>();// Crea respuesta en formato clave-valor
        response.put("disponible", disponible);// Agrega el resultado al mapa
        return ResponseEntity.ok(response);
    }

    // Obtener horas disponibles para un día específico
    @GetMapping("/horas-disponibles")
    public List<String> getHorasDisponibles(@RequestParam String dia) {
        Reserva reserva = new Reserva();
        reserva.setDia(dia);// Asigna el día recibido por parámetro
        return reservaService.getHorasDisponibles(reserva);
    }

    // Borrar reserva por id
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Integer id) {
        reservaService.removeReserva(id);
    }
}

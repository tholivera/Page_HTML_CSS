package com.mundoyoga.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mundoyoga.model.Formulario;
import com.mundoyoga.repository.FormularioRepository;

@RestController
@RequestMapping("/mensagens")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FormularioController {
	
	@Autowired
	private FormularioRepository formularioRepository;

	@GetMapping
	public ResponseEntity<List<Formulario>> getAll() {
		return ResponseEntity.ok(formularioRepository.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Formulario> getById(@PathVariable long id) {
		return formularioRepository.findById(id).map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<Formulario> postMensagem(@Valid @RequestBody Formulario formulario) {
		return ResponseEntity.status(HttpStatus.CREATED).body(formularioRepository.save(formulario));
	}


}

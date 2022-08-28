package com.mundoyoga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mundoyoga.model.Formulario;

@Repository
public interface FormularioRepository extends JpaRepository<Formulario, Long> {
	
}
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema consultarq
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema consultarq
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `consultarq` DEFAULT CHARACTER SET utf8 ;
USE `consultarq` ;

-- -----------------------------------------------------
-- Table `consultarq`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`administrador` (
  `idadministrador` INT(11) NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`idadministrador`),
  UNIQUE INDEX `idadministrador_UNIQUE` (`idadministrador` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`area` (
  `idArea` INT(11) NOT NULL AUTO_INCREMENT,
  `nombreArea` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idArea`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`bitacora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`bitacora` (
  `idbitacora` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `concepto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idbitacora`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`cliente` (
  `idCliente` INT(11) NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(45) NOT NULL,
  `primerApelllido` VARCHAR(45) NULL DEFAULT NULL,
  `segundoApellido` VARCHAR(45) NULL DEFAULT NULL,
  `RFC` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(10) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `estatus` TINYINT(4) NOT NULL,
  PRIMARY KEY (`idCliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`proyecto` (
  `idProyecto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `calle` VARCHAR(45) NOT NULL,
  `colonia` VARCHAR(45) NOT NULL,
  `fechaInicio` DATE NOT NULL,
  `fechaFin` DATE NOT NULL,
  `estatus` TINYINT(4) NOT NULL DEFAULT 0,
  `idCliente` INT(11) NOT NULL,
  PRIMARY KEY (`idProyecto`),
  INDEX `fk_proyecto_cliente_idx` (`idCliente` ASC) ,
  CONSTRAINT `fk_proyecto_cliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `consultarq`.`cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`checklist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`checklist` (
  `idChecklist` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idProyecto` INT(11) NOT NULL,
  PRIMARY KEY (`idChecklist`),
  INDEX `fk_checklist_proyecto1_idx` (`idProyecto` ASC) ,
  CONSTRAINT `fk_checklist_proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `consultarq`.`proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`catalogoservicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`catalogoservicio` (
  `idServicio` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idChecklist` INT(11) NOT NULL,
  PRIMARY KEY (`idServicio`),
  UNIQUE INDEX `idServicio_UNIQUE` (`idServicio` ASC) ,
  INDEX `fk_CatalogoServicios_checklist1_idx` (`idChecklist` ASC) ,
  CONSTRAINT `fk_CatalogoServicios_checklist1`
    FOREIGN KEY (`idChecklist`)
    REFERENCES `consultarq`.`checklist` (`idChecklist`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`subserivicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`subserivicio` (
  `idSubServicio` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idServicio` INT(11) NOT NULL,
  PRIMARY KEY (`idSubServicio`),
  INDEX `fk_SubSerivicios_CatalogoServicios1_idx` (`idServicio` ASC) ,
  CONSTRAINT `fk_SubSerivicios_CatalogoServicios1`
    FOREIGN KEY (`idServicio`)
    REFERENCES `consultarq`.`catalogoservicio` (`idServicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`conceptocatalogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`conceptocatalogo` (
  `idConceptoCatalogo` INT(11) NOT NULL AUTO_INCREMENT,
  `concepto` VARCHAR(45) NOT NULL,
  `unidadMedida` VARCHAR(45) NOT NULL,
  `cantidad` DOUBLE NOT NULL,
  `montoXUnidad` DOUBLE NOT NULL,
  `montoTotal` DOUBLE NOT NULL,
  `idSubServicio` INT(11) NOT NULL,
  PRIMARY KEY (`idConceptoCatalogo`),
  INDEX `fk_conceptosCatalogo_SubSerivicios1_idx` (`idSubServicio` ASC) ,
  CONSTRAINT `fk_conceptosCatalogo_SubSerivicios1`
    FOREIGN KEY (`idSubServicio`)
    REFERENCES `consultarq`.`subserivicio` (`idSubServicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`conceptogasto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`conceptogasto` (
  `idConceptoGasto` INT(11) NOT NULL AUTO_INCREMENT,
  `conceptoGasto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idConceptoGasto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`conceptoingreso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`conceptoingreso` (
  `idConceptoIngreso` INT(11) NOT NULL AUTO_INCREMENT,
  `conceptoIngreso` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idConceptoIngreso`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
  `tipoRol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`empleado` (
  `idEmpleado` INT(11) NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(45) NOT NULL,
  `primerApellido` VARCHAR(45) NOT NULL,
  `segundoApellido` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `estatus` TINYINT(4) NOT NULL,
  `idRol` INT(11) NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  INDEX `fk_empleado_rol1_idx` (`idRol` ASC) ,
  CONSTRAINT `fk_empleado_rol1`
    FOREIGN KEY (`idRol`)
    REFERENCES `consultarq`.`rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`empleadoarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`empleadoarea` (
  `idEmpleado` INT(11) NOT NULL,
  `idArea` INT(11) NOT NULL,
  PRIMARY KEY (`idEmpleado`, `idArea`),
  INDEX `fk_empleado_has_area_area1_idx` (`idArea` ASC) ,
  INDEX `fk_empleado_has_area_empleado1_idx` (`idEmpleado` ASC) ,
  CONSTRAINT `fk_empleado_has_area_area1`
    FOREIGN KEY (`idArea`)
    REFERENCES `consultarq`.`area` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_empleado_has_area_empleado1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `consultarq`.`empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`factura` (
  `idFactura` INT(11) NOT NULL AUTO_INCREMENT,
  `rfc` VARCHAR(45) NOT NULL,
  `tipo` TINYINT(4) NOT NULL,
  `idProyecto` INT(11) NOT NULL,
  PRIMARY KEY (`idFactura`),
  INDEX `fk_facturas_proyecto1_idx` (`idProyecto` ASC) ,
  CONSTRAINT `fk_facturas_proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `consultarq`.`proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`metododepago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`metododepago` (
  `idMetodoDePago` INT(11) NOT NULL AUTO_INCREMENT,
  `metodo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMetodoDePago`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`gasto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`gasto` (
  `idGasto` INT(11) NOT NULL AUTO_INCREMENT,
  `monto` DOUBLE NOT NULL,
  `fechaGasto` DATE NOT NULL,
  `fechaRegistro` DATETIME NOT NULL,
  `facturado` TINYINT(4) NOT NULL DEFAULT 0,
  `idUsuario` INT(11) NOT NULL,
  `idConceptoGasto` INT(11) NOT NULL,
  `idMetodoDePago` INT(11) NOT NULL,
  PRIMARY KEY (`idGasto`),
  INDEX `fk_gastos_usuario1_idx` (`idUsuario` ASC) ,
  INDEX `fk_gastos_conceptoGasto1_idx` (`idConceptoGasto` ASC) ,
  INDEX `fk_gastos_metododepago1_idx` (`idMetodoDePago` ASC) ,
  CONSTRAINT `fk_gastos_conceptoGasto1`
    FOREIGN KEY (`idConceptoGasto`)
    REFERENCES `consultarq`.`conceptogasto` (`idConceptoGasto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gastos_metododepago1`
    FOREIGN KEY (`idMetodoDePago`)
    REFERENCES `consultarq`.`metododepago` (`idMetodoDePago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gastos_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `consultarq`.`empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`ingreso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`ingreso` (
  `idIngreso` INT(11) NOT NULL AUTO_INCREMENT,
  `monto` DOUBLE NOT NULL,
  `fechaGasto` DATE NOT NULL,
  `fechaRegistro` DATETIME NOT NULL,
  `facturado` TINYINT(4) NOT NULL DEFAULT 0,
  `idProyecto` INT(11) NOT NULL,
  `idConceptoIngreso` INT(11) NOT NULL,
  PRIMARY KEY (`idIngreso`),
  INDEX `fk_ingresos_proyecto1_idx` (`idProyecto` ASC) ,
  INDEX `fk_ingreso_conceptoIngreso1_idx` (`idConceptoIngreso` ASC) ,
  CONSTRAINT `fk_ingreso_conceptoIngreso1`
    FOREIGN KEY (`idConceptoIngreso`)
    REFERENCES `consultarq`.`conceptoingreso` (`idConceptoIngreso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingresos_proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `consultarq`.`proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`pago` (
  `idPago` INT(11) NOT NULL AUTO_INCREMENT,
  `monto` DOUBLE NOT NULL,
  `fechaPago` DATE NOT NULL,
  `fechaRegistro` DATETIME NOT NULL,
  `facturado` TINYINT(4) NOT NULL,
  `idProyecto` INT(11) NOT NULL,
  PRIMARY KEY (`idPago`),
  INDEX `fk_pagos_proyecto1_idx` (`idProyecto` ASC) ,
  CONSTRAINT `fk_pagos_proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `consultarq`.`proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`proveedor` (
  `idProveedor` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `dro` VARCHAR(45) NULL DEFAULT NULL,
  `cedula` VARCHAR(45) NULL DEFAULT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `numeroCuenta` VARCHAR(20) NOT NULL,
  `estatus` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idProveedor`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`proveedorarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`proveedorarea` (
  `idProveedor` INT(11) NOT NULL,
  `idArea` INT(11) NOT NULL,
  PRIMARY KEY (`idProveedor`, `idArea`),
  INDEX `fk_proveedor_has_area_area1_idx` (`idArea` ASC) ,
  INDEX `fk_proveedor_has_area_proveedor1_idx` (`idProveedor` ASC) ,
  CONSTRAINT `fk_proveedor_has_area_area1`
    FOREIGN KEY (`idArea`)
    REFERENCES `consultarq`.`area` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proveedor_has_area_proveedor1`
    FOREIGN KEY (`idProveedor`)
    REFERENCES `consultarq`.`proveedor` (`idProveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`proyectoempleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`proyectoempleado` (
  `idProyecto` INT(11) NOT NULL,
  `idEmpleado` INT(11) NOT NULL,
  PRIMARY KEY (`idProyecto`, `idEmpleado`),
  INDEX `fk_proyecto_has_empleado_empleado1_idx` (`idEmpleado` ASC) ,
  INDEX `fk_proyecto_has_empleado_proyecto1_idx` (`idProyecto` ASC) ,
  CONSTRAINT `fk_proyecto_has_empleado_empleado1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `consultarq`.`empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyecto_has_empleado_proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `consultarq`.`proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`sessions` (
  `session_id` VARCHAR(128) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `expires` INT(11) UNSIGNED NOT NULL,
  `data` MEDIUMTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`tarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`tarea` (
  `idTarea` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  `estatus` TINYINT(4) NOT NULL DEFAULT 0,
  `idProyecto` INT(11) NOT NULL,
  PRIMARY KEY (`idTarea`),
  INDEX `fk_tareas_proyecto1_idx` (`idProyecto` ASC) ,
  CONSTRAINT `fk_tareas_proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `consultarq`.`proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `consultarq`.`tareaempleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`tareaempleado` (
  `idTarea` INT(11) NOT NULL,
  `idEmpleado` INT(11) NOT NULL,
  PRIMARY KEY (`idTarea`, `idEmpleado`),
  INDEX `fk_tarea_has_empleado_empleado1_idx` (`idEmpleado` ASC) ,
  INDEX `fk_tarea_has_empleado_tarea1_idx` (`idTarea` ASC) ,
  CONSTRAINT `fk_tarea_has_empleado_empleado1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `consultarq`.`empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarea_has_empleado_tarea1`
    FOREIGN KEY (`idTarea`)
    REFERENCES `consultarq`.`tarea` (`idTarea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

ALTER TABLE `consultarq`.`checklist` 
CHANGE COLUMN `nombre` `nombreChecklist` VARCHAR(45) NOT NULL ;

ALTER TABLE `consultarq`.`subserivicio` 
CHANGE COLUMN `nombre` `nombreSub` VARCHAR(45) NOT NULL ;


-- -----------------------------------------------------
-- Table `consultarq`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultarq`.`usuario` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `idEmpleado` INT(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `nick_UNIQUE` (`username` ASC) ,
  INDEX `fk_Usuario_Empleado1_idx` (`idEmpleado` ASC) ,
  CONSTRAINT `fk_Usuario_Empleado1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `consultarq`.`empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

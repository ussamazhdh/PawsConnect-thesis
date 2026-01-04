package com.adptapaw.backend.payload.adoption;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class AdoptionAnimalDTO {
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;
    
    @NotBlank(message = "Breed is required")
    @Size(max = 100, message = "Breed must not exceed 100 characters")
    private String breed;
    
    @NotBlank(message = "Training information is required")
    @Size(max = 200, message = "Training information must not exceed 200 characters")
    private String training;
    
    @NotBlank(message = "Vaccine information is required")
    @Size(max = 200, message = "Vaccine information must not exceed 200 characters")
    private String vaccine;
    
    @NotBlank(message = "Color is required")
    @Size(max = 50, message = "Color must not exceed 50 characters")
    private String color;
    
    @NotBlank(message = "Description is required")
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;
    
    @NotBlank(message = "Physical condition is required")
    @Size(max = 200, message = "Physical condition must not exceed 200 characters")
    private String physicalcondition;
    
    @Size(max = 1000, message = "Image URL must not exceed 1000 characters")
    private String imageone;
    
    @Size(max = 1000, message = "Image URL must not exceed 1000 characters")
    private String imagetwo;
    
    @Size(max = 1000, message = "Image URL must not exceed 1000 characters")
    private String imagethree;
    
    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;
    
    @NotBlank(message = "Behaviour information is required")
    @Size(max = 200, message = "Behaviour information must not exceed 200 characters")
    private String behaviour;
    
    @NotBlank(message = "Food information is required")
    @Size(max = 200, message = "Food information must not exceed 200 characters")
    private String food;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotBlank(message = "Type is required")
    private String type;
    
    private Boolean availability;
    
    private AdoptionUserDTO user;
    
    @NotBlank(message = "Mobile number is required")
    @Size(max = 20, message = "Mobile number must not exceed 20 characters")
    private String mobile;
    
    private String postedon;
}

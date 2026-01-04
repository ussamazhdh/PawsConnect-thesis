package com.adptapaw.backend.config;

import com.adptapaw.backend.entity.*;
import com.adptapaw.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;   // <-- IMPORTANT

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private AdoptionAnimalRepository adoptionAnimalRepository;

    @Autowired
    private MissingAnimalRepository missingAnimalRepository;

    @Autowired
    private DonationPostRepository donationPostRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Run inside a single transaction so Role and User entities
     * stay in the same persistence context (prevents detached-entity errors).
     */
    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Only seed if database is empty
        if (userRepository.count() > 0) {
            System.out.println("Database already contains data. Skipping seed.");
            return;
        }

        System.out.println("Starting database seeding...");

        // Ensure roles exist (and stay managed inside this transaction)
        createRoleIfNotExists("ROLE_ADMIN");
        createRoleIfNotExists("ROLE_USER");

        // Create Admin User
        User admin = createUserIfNotExists(
                "Admin User",
                "admin",
                "admin@pawconnect.com",
                "admin123",
                "Warsaw, Poland",
                "Administrator of PawConnect platform",
                true,
                "ROLE_ADMIN"
        );

        // Create Regular User
        User regularUser = createUserIfNotExists(
                "John Doe",
                "johndoe",
                "john@pawconnect.com",
                "user123",
                "Krakow, Poland",
                "Animal lover and volunteer",
                false,
                "ROLE_USER"
        );

        // Create another regular user
        User regularUser2 = createUserIfNotExists(
                "Jane Smith",
                "janesmith",
                "jane@pawconnect.com",
                "user123",
                "Gdansk, Poland",
                "Pet rescuer and foster parent",
                false,
                "ROLE_USER"
        );

        // Create Adoption Posts
        createAdoptionPosts(admin, regularUser, regularUser2);

        // Create Missing Animal Posts
        createMissingAnimalPosts(admin, regularUser, regularUser2);

        // Create Donation Posts
        createDonationPosts();

        System.out.println("Database seeding completed successfully!");
    }

    private Roles createRoleIfNotExists(String roleName) {
        return rolesRepository.findByName(roleName)
                .orElseGet(() -> {
                    Roles role = new Roles();
                    role.setName(roleName);
                    return rolesRepository.save(role);
                });
    }

    private User createUserIfNotExists(String name,
                                       String username,
                                       String email,
                                       String password,
                                       String location,
                                       String bio,
                                       boolean isAdmin,      // currently not used, but you can use it later if needed
                                       String roleName) {

        // If user already exists, just return it
        if (userRepository.existsByEmail(email) || userRepository.existsByUsername(username)) {
            return userRepository.findByEmail(email)
                    .orElse(userRepository.findByUsername(username).orElse(null));
        }

        // Load role INSIDE the same transaction so it is a managed entity
        Roles role = rolesRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setLocation(location);
        user.setBio(bio);
        user.setAccountVerified(true);
        user.setBanned(false);
        user.setDp("");

        Set<Roles> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);

        return userRepository.save(user);
    }

    private void createAdoptionPosts(User admin, User user1, User user2) {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Adoption Post 1
        AdoptionAnimal adoption1 = new AdoptionAnimal();
        adoption1.setName("Luna");
        adoption1.setBreed("Golden Retriever");
        adoption1.setTraining("Basic commands");
        adoption1.setVaccine("Fully vaccinated");
        adoption1.setColor("Golden");
        adoption1.setImageone("https://images.unsplash.com/photo-1552053831-71594a27632d?w=400");
        adoption1.setImagetwo("");
        adoption1.setImagethree("");
        adoption1.setDescription("Luna is a friendly and energetic 2-year-old Golden Retriever. She loves playing fetch and going for walks. Great with kids and other dogs.");
        adoption1.setPhysicalcondition("Healthy");
        adoption1.setLocation("Warsaw, Poland");
        adoption1.setBehaviour("Friendly, playful");
        adoption1.setFood("Dry dog food");
        adoption1.setGender("Female");
        adoption1.setType("Dog");
        adoption1.setMobile("+48 123 456 789");
        adoption1.setPostedon(currentDate);
        adoption1.setAvailability(true);
        adoption1.setUser(admin);
        adoptionAnimalRepository.save(adoption1);

        // Adoption Post 2
        AdoptionAnimal adoption2 = new AdoptionAnimal();
        adoption2.setName("Whiskers");
        adoption2.setBreed("Persian");
        adoption2.setTraining("Litter trained");
        adoption2.setVaccine("Up to date");
        adoption2.setColor("White");
        adoption2.setImageone("https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400");
        adoption2.setImagetwo("");
        adoption2.setImagethree("");
        adoption2.setDescription("Whiskers is a calm and gentle 3-year-old Persian cat. Perfect for a quiet home. Loves cuddling and napping.");
        adoption2.setPhysicalcondition("Healthy");
        adoption2.setLocation("Krakow, Poland");
        adoption2.setBehaviour("Calm, affectionate");
        adoption2.setFood("Premium cat food");
        adoption2.setGender("Male");
        adoption2.setType("Cat");
        adoption2.setMobile("+48 987 654 321");
        adoption2.setPostedon(currentDate);
        adoption2.setAvailability(true);
        adoption2.setUser(user1);
        adoptionAnimalRepository.save(adoption2);

        // Adoption Post 3
        AdoptionAnimal adoption3 = new AdoptionAnimal();
        adoption3.setName("Max");
        adoption3.setBreed("German Shepherd");
        adoption3.setTraining("Advanced training");
        adoption3.setVaccine("Fully vaccinated");
        adoption3.setColor("Black and Tan");
        adoption3.setImageone("https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400");
        adoption3.setImagetwo("");
        adoption3.setImagethree("");
        adoption3.setDescription("Max is a loyal and intelligent 4-year-old German Shepherd. Excellent guard dog, great with families. Needs active lifestyle.");
        adoption3.setPhysicalcondition("Healthy");
        adoption3.setLocation("Gdansk, Poland");
        adoption3.setBehaviour("Loyal, protective");
        adoption3.setFood("High-quality dog food");
        adoption3.setGender("Male");
        adoption3.setType("Dog");
        adoption3.setMobile("+48 555 123 456");
        adoption3.setPostedon(currentDate);
        adoption3.setAvailability(true);
        adoption3.setUser(user2);
        adoptionAnimalRepository.save(adoption3);

        // Adoption Post 4
        AdoptionAnimal adoption4 = new AdoptionAnimal();
        adoption4.setName("Bella");
        adoption4.setBreed("Siamese");
        adoption4.setTraining("Litter trained");
        adoption4.setVaccine("Up to date");
        adoption4.setColor("Cream and Brown");
        adoption4.setImageone("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400");
        adoption4.setImagetwo("");
        adoption4.setImagethree("");
        adoption4.setDescription("Bella is a vocal and social 1-year-old Siamese cat. Loves attention and playing with toys. Perfect for active families.");
        adoption4.setPhysicalcondition("Healthy");
        adoption4.setLocation("Wroclaw, Poland");
        adoption4.setBehaviour("Social, playful");
        adoption4.setFood("Wet and dry cat food");
        adoption4.setGender("Female");
        adoption4.setType("Cat");
        adoption4.setMobile("+48 444 789 012");
        adoption4.setPostedon(currentDate);
        adoption4.setAvailability(true);
        adoption4.setUser(admin);
        adoptionAnimalRepository.save(adoption4);

        // Adoption Post 5
        AdoptionAnimal adoption5 = new AdoptionAnimal();
        adoption5.setName("Rocky");
        adoption5.setBreed("Mixed Breed");
        adoption5.setTraining("Basic commands");
        adoption5.setVaccine("Fully vaccinated");
        adoption5.setColor("Brown");
        adoption5.setImageone("https://images.unsplash.com/photo-1534361960057-19889c938271?w=400");
        adoption5.setImagetwo("");
        adoption5.setImagethree("");
        adoption5.setDescription("Rocky is a sweet and gentle 5-year-old mixed breed dog. Rescued from the streets, now looking for a loving home.");
        adoption5.setPhysicalcondition("Healthy");
        adoption5.setLocation("Poznan, Poland");
        adoption5.setBehaviour("Gentle, friendly");
        adoption5.setFood("Standard dog food");
        adoption5.setGender("Male");
        adoption5.setType("Dog");
        adoption5.setMobile("+48 333 456 789");
        adoption5.setPostedon(currentDate);
        adoption5.setAvailability(true);
        adoption5.setUser(user1);
        adoptionAnimalRepository.save(adoption5);
    }

    private void createMissingAnimalPosts(User admin, User user1, User user2) {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String missingDate1 = LocalDate.now().minusDays(2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String missingDate2 = LocalDate.now().minusDays(5).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String missingDate3 = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Missing Animal Post 1
        MissingAnimal missing1 = new MissingAnimal();
        missing1.setName("Charlie");
        missing1.setBreed("Labrador");
        missing1.setVaccine("Fully vaccinated");
        missing1.setColor("Yellow");
        missing1.setDatemissing(missingDate1);
        missing1.setImage("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400");
        missing1.setSpecificattribute("Wearing blue collar with name tag");
        missing1.setLocation("Warsaw, Poland - City Center");
        missing1.setAccessorieslastworn("Blue collar, red leash");
        missing1.setRewards("500 PLN reward");
        missing1.setGender("Male");
        missing1.setType("Dog");
        missing1.setStillmissing(true);
        missing1.setCreator(admin);
        missingAnimalRepository.save(missing1);

        // Missing Animal Post 2
        MissingAnimal missing2 = new MissingAnimal();
        missing2.setName("Mittens");
        missing2.setBreed("British Shorthair");
        missing2.setVaccine("Up to date");
        missing2.setColor("Gray");
        missing2.setDatemissing(missingDate2);
        missing2.setImage("https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400");
        missing2.setSpecificattribute("White paws, green eyes");
        missing2.setLocation("Krakow, Poland - Old Town");
        missing2.setAccessorieslastworn("Red collar with bell");
        missing2.setRewards("300 PLN reward");
        missing2.setGender("Female");
        missing2.setType("Cat");
        missing2.setStillmissing(true);
        missing2.setCreator(user1);
        missingAnimalRepository.save(missing2);

        // Missing Animal Post 3
        MissingAnimal missing3 = new MissingAnimal();
        missing3.setName("Buddy");
        missing3.setBreed("Beagle");
        missing3.setVaccine("Fully vaccinated");
        missing3.setColor("Tri-color");
        missing3.setDatemissing(missingDate3);
        missing3.setImage("https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400");
        missing3.setSpecificattribute("Very friendly, responds to name");
        missing3.setLocation("Gdansk, Poland - Beach area");
        missing3.setAccessorieslastworn("Green harness");
        missing3.setRewards("400 PLN reward");
        missing3.setGender("Male");
        missing3.setType("Dog");
        missing3.setStillmissing(true);
        missing3.setCreator(user2);
        missingAnimalRepository.save(missing3);

        // Missing Animal Post 4
        MissingAnimal missing4 = new MissingAnimal();
        missing4.setName("Shadow");
        missing4.setBreed("Black Cat");
        missing4.setVaccine("Up to date");
        missing4.setColor("Black");
        missing4.setDatemissing(missingDate1);
        missing4.setImage("https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400");
        missing4.setSpecificattribute("All black, yellow eyes");
        missing4.setLocation("Wroclaw, Poland - Residential area");
        missing4.setAccessorieslastworn("No collar");
        missing4.setRewards("200 PLN reward");
        missing4.setGender("Male");
        missing4.setType("Cat");
        missing4.setStillmissing(true);
        missing4.setCreator(admin);
        missingAnimalRepository.save(missing4);
    }

    private void createDonationPosts() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Donation Post 1
        DonationPost donation1 = new DonationPost();
        donation1.setName("Emergency Medical Fund for Injured Stray Dogs");
        donation1.setType("Medical");
        donation1.setDescription("We need urgent funds to treat 5 stray dogs found injured on the streets. They require surgery and medical care.");
        donation1.setTargetamount(50000L);
        donation1.setRemainingamount(35000L);
        donation1.setPeopledonated(15L);
        donation1.setImage("https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400");
        donation1.setLocation("Warsaw, Poland");
        donation1.setCreationtime(currentDate);
        donationPostRepository.save(donation1);

        // Donation Post 2
        DonationPost donation2 = new DonationPost();
        donation2.setName("Shelter Food and Supplies Drive");
        donation2.setType("Food & Supplies");
        donation2.setDescription("Help us provide food, blankets, and medical supplies for our shelter animals. Every donation helps!");
        donation2.setTargetamount(30000L);
        donation2.setRemainingamount(18000L);
        donation2.setPeopledonated(42L);
        donation2.setImage("https://images.unsplash.com/photo-1583336663277-620dc1996580?w=400");
        donation2.setLocation("Krakow, Poland");
        donation2.setCreationtime(currentDate);
        donationPostRepository.save(donation2);

        // Donation Post 3
        DonationPost donation3 = new DonationPost();
        donation3.setName("Rescue Operation for Abandoned Kittens");
        donation3.setType("Rescue");
        donation3.setDescription("We found 8 abandoned kittens that need immediate care, vaccinations, and finding forever homes.");
        donation3.setTargetamount(25000L);
        donation3.setRemainingamount(12000L);
        donation3.setPeopledonated(28L);
        donation3.setImage("https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400");
        donation3.setLocation("Gdansk, Poland");
        donation3.setCreationtime(currentDate);
        donationPostRepository.save(donation3);
    }
}
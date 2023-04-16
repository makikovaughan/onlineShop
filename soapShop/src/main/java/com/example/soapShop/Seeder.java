package com.example.soapShop;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.soapShop.entities.Inventory;
import com.example.soapShop.entities.User;
import com.example.soapShop.entities.embeddable.Credentials;
import com.example.soapShop.entities.embeddable.Profile;
import com.example.soapShop.repositories.InventoryRepository;
import com.example.soapShop.repositories.UserRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Data
public class Seeder implements CommandLineRunner {

	private final InventoryRepository inventoryRepository;
	private final UserRepository userRepository;

	@Override
	public void run(String... args) throws Exception {

		Inventory inventory1 = new Inventory();
		Inventory inventory2 = new Inventory();
		Inventory inventory3 = new Inventory();
		Inventory inventory4 = new Inventory();

		inventory1.setName("Macadamia Bar Soap");
		inventory1.setPicture("./images/macadamia-soap-skin-care-treatment.jpg");
		inventory1.setQty(10);
		inventory1.setPrice(2.50);

		inventory2.setName("Lemon Bar Soap");
		inventory2.setPicture("./images/closeup-shot-handmade-scented-coffee-soap-with-cinnamon-wooden-background.jpg");
		inventory2.setQty(20);
		inventory2.setPrice(2.50);

		inventory3.setName("Lemon Liquid Soap");
		inventory3.setPicture("./images/18949.jpg");
		inventory3.setQty(10);
		inventory3.setPrice(6.50);

		inventory4.setName("Lavender Liquid Soap");
		inventory4.setPicture("./images/18030490.jpg");
		inventory4.setQty(20);
		inventory4.setPrice(6.50);

		inventoryRepository
				.saveAllAndFlush(Arrays.asList(new Inventory[] { inventory1, inventory2, inventory3, inventory4 }));

		Credentials credentials1 = new Credentials();
		Credentials credentials2 = new Credentials();
		Credentials credentials3 = new Credentials();

		credentials3.setPassword("123123");
		credentials3.setUsername("user123");

		credentials2.setPassword("22222");
		credentials2.setUsername("user2");

		credentials1.setPassword("11111");
		credentials1.setUsername("user1");

		Profile profile1 = new Profile();
		Profile profile2 = new Profile();
		Profile profile3 = new Profile();

		profile1.setFirstName("John");
		profile1.setLastName("Doe");
		profile1.setStreet("111 Defg Ave");
		profile1.setCity("New York City");
		profile1.setEmail("johndoe@gmail.com");
		profile1.setPhone("111-111-1111");
		profile1.setState("NY");
		profile1.setZipcode(30004);

		profile2.setFirstName("Jane");
		profile2.setLastName("Doe");
		profile2.setStreet("111 Hij Cir");
		profile2.setCity("Decatur");
		profile2.setEmail("janedoe@gmail.com");
		profile2.setPhone("222-222-2222");
		profile2.setState("GA");
		profile2.setZipcode(30380);

		profile3.setFirstName("Randy");
		profile3.setLastName("Vaughan");
		profile3.setStreet("123 Abc Street #123");
		profile3.setCity("Atlanta");
		profile3.setEmail("randyvaughan@gmail.com");
		profile3.setPhone("123-123-1234");
		profile3.setState("GA");
		profile3.setZipcode(30350);

		User user1 = new User();
		User user2 = new User();
		User user3 = new User();

		user1.setCredentials(credentials1);
		user1.setIsAdmin(true);
		user1.setProfile(profile1);

		user2.setCredentials(credentials2);
		user2.setIsAdmin(false);
		user2.setProfile(profile2);

		user3.setCredentials(credentials3);
		user3.setIsAdmin(false);
		user3.setProfile(profile3);

		userRepository.saveAllAndFlush(Arrays.asList(new User[] { user1, user2, user3 }));

	}

}

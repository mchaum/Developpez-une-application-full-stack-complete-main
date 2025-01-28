package com.openclassrooms.mddapi;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.mddapi.DTO.CommentDTO;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommentDTOTest {

	@Test
	public void testJsonToCommentDTO() throws Exception {
	    System.out.println("Début du test...");
	    String json = "{\"userId\":1,\"articleId\":1,\"description\":\"This is a comment.\"}";

	    ObjectMapper objectMapper = new ObjectMapper();
	    CommentDTO dto = objectMapper.readValue(json, CommentDTO.class);

	    System.out.println("Conversion JSON -> DTO terminée : " + dto);
	    assertEquals(1L, dto.getUserId());
	    assertEquals(1L, dto.getArticleId());
	    assertEquals("This is a comment.", dto.getDescription());
	    System.out.println("Assertions réussies !");
	}

}

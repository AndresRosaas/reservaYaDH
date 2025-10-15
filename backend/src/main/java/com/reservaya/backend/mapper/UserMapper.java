package com.reservaya.backend.mapper;

import com.reservaya.backend.dto.UserDTO;
import com.reservaya.backend.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserMapper {
    //Entity a DTO
    public UserDTO toDTO (User user){
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setAvatar(generateAvatar(user.getFirstName(),user.getLastName()));

        return dto;
    }
    //arme un metodo helper para crear un avatar que sea de las iniciales
    private String generateAvatar(String name, String lastName){
        if (name != null && lastName != null && !name.isEmpty() && !lastName.isEmpty()){
            return name.charAt(0) + "" + lastName.charAt(0);
        }
        return "U";
    }
    //DTO a Entity
    public User toEntity (UserDTO dto){
        if(dto == null) return null;

        User user = new User();
        user.setId(dto.getId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());// solo lo recibo del dto por seguridad
        user.setRole(dto.getRole());

        return user;

    }
    public List<UserDTO> toDTOList(List<User> users){
        List<UserDTO> usersDTO = new ArrayList<>();

        for (User user :users){
            usersDTO.add((toDTO(user)));

        }
        return usersDTO;
    }
}

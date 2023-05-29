package com.socialnetwork.demo.services;

import com.socialnetwork.demo.dto.PostDto;
import com.socialnetwork.demo.exceptions.NotFoundException;
import com.socialnetwork.demo.models.Post;
import com.socialnetwork.demo.models.User;
import com.socialnetwork.demo.repositories.PostRepository;
import com.socialnetwork.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService extends AuthenticatedService {

  private final UserRepository userRepository;
  private final PostRepository postRepository;
  private final ModelMapper modelMapper;

  public PostDto newPost(Post post) {
    User user = getAuthenticatedUser();

    post.setUser(user);
    post.setDate(new Date());

    postRepository.save(post);

    return modelMapper.map(post, PostDto.class);
  }

  public List<PostDto> getAllPosts() {
    Sort sorting = Sort.by(Sort.Direction.DESC, "date");
    List<Post> posts = postRepository.findAll(sorting);
    return posts.stream().map(post -> modelMapper.map(post, PostDto.class)).toList();
  }

  public PostDto getPost(Integer postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);

    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    return modelMapper.map(optionalPost.get(), PostDto.class);
  }

  public List<PostDto> getUserPosts(Integer userId) {
    Optional<User> optionalUser = userRepository.findById(userId);
    if (optionalUser.isEmpty()) {
      throw new NotFoundException("user not found");
    }
    User user = optionalUser.get();

    List<Post> userPosts = postRepository.findByUserIdOrderByDateDesc(userId);

    return userPosts.stream().map(post -> modelMapper.map(post, PostDto.class)).toList();
  }

  public Boolean deletePost(Integer postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);

    if (optionalPost.isEmpty()) {
      throw new NotFoundException("post not found");
    }

    User user = getAuthenticatedUser();
    Post post = optionalPost.get();

    if (!Objects.equals(post.getUser().getId(), user.getId())) {
      return false;
    }

    postRepository.delete(post);
    return true;
  }
}

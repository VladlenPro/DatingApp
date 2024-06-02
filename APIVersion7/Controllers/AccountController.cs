using System.Security.Cryptography;
using System.Text;
using APIVersion7.Data;
using APIVersion7.DTOs;
using APIVersion7.Entities;
using APIVersion7.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIVersion7.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _tokenService = tokenService;
        _context = context;
        
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {

        if(await IsUserExist(registerDto.Username))
        {
            return BadRequest($"this username {registerDto.Username} already exist");
        }

        using HMACSHA512 hmac = new HMACSHA512();

        AppUser user = new AppUser
        {
            UserName = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key  
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)

        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        AppUser user = await _context.Users.SingleOrDefaultAsync(appUser => appUser.UserName == loginDto.Username);

        if(user == null) return Unauthorized("invalid username");

        using HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt);
        byte[] computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for(int i = 0;i<computeHash.Length;i++)
        {
            if(computeHash[i]!= user.PasswordHash[i]) return Unauthorized("invalid password");
        }

         return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)

        };
    }

    private async Task<bool> IsUserExist(string username)
    {
        return await _context.Users.AnyAsync(appUser => appUser.UserName == username.ToLower());
    }
}

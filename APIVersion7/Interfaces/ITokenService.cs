using APIVersion7.Entities;

namespace APIVersion7.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user);
}
